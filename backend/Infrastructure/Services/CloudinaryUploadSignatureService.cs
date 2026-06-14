using backend.Features.Uploads.CreateUploadSignature;
using CloudinaryDotNet;
using Microsoft.Extensions.Options;

namespace backend.Infrastructure.Services;

public class CloudinaryUploadSignatureService(IOptions<CloudinarySettings> options)
    : ICloudinaryUploadSignatureService
{
    private readonly CloudinarySettings settings = options.Value;

    public CreateUploadSignatureResponse CreateSignature(
        CreateUploadSignatureRequest request,
        string userId
    )
    {
        if (string.IsNullOrWhiteSpace(settings.CloudName) ||
            string.IsNullOrWhiteSpace(settings.ApiKey) ||
            string.IsNullOrWhiteSpace(settings.ApiSecret))
        {
            throw new InvalidOperationException("Cloudinary settings are not configured.");
        }

        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        var folder = GetFolder(request.Usage, userId);
        var publicId = Guid.NewGuid().ToString("N");
        var resourceType = GetResourceType(request.ContentType);

        var account = new Account(
            settings.CloudName,
            settings.ApiKey,
            settings.ApiSecret
        );

        var cloudinary = new Cloudinary(account);

        // The exact parameters the frontend must send to Cloudinary.
        var parameters = new SortedDictionary<string, object>
        {
            ["folder"] = folder,
            ["public_id"] = publicId,
            ["timestamp"] = timestamp
        };

        var signature = cloudinary.Api.SignParameters(parameters);

        return new CreateUploadSignatureResponse(
            settings.CloudName,
            settings.ApiKey,
            timestamp,
            signature,
            folder,
            publicId,
            resourceType,
            $"https://api.cloudinary.com/v1_1/{settings.CloudName}/{resourceType}/upload"
        );
    }

    /// <summary>Maps different usage to different folders in Cloudinary to keep things organized.</summary>
    private string GetFolder(string usage, string userId)
    {
        var root = settings.RootFolder.Trim('/');

        return usage switch
        {
            "avatar" => $"{root}/avatars/{userId}",
            "post-media" => $"{root}/posts/{userId}",
            "campaign-media" => $"{root}/campaigns/{userId}",
            _ => throw new InvalidOperationException("Unsupported upload usage.")
        };
    }

    /// <summary>Cloudinary splits upload endpoints by resource type, so videos must go to /video/upload, and images to /image/upload</summary>
    private static string GetResourceType(string contentType)
    {
        return contentType.StartsWith("video/", StringComparison.OrdinalIgnoreCase)
            ? "video"
            : "image";
    }
}