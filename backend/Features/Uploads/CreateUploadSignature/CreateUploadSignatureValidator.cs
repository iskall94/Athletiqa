using FluentValidation;

namespace backend.Features.Uploads.CreateUploadSignature;

public class CreateUploadSignatureValidator : AbstractValidator<CreateUploadSignatureRequest>
{
    private static readonly string[] AllowedUsages = ["avatar", "post-media", "campaign-media"];
    private static readonly string[] AllowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
    private static readonly string[] AllowedVideoTypes = ["video/mp4", "video/webm", "video/quicktime"];

    public CreateUploadSignatureValidator()
    {
        RuleFor(x => x.Usage)
            .NotEmpty()
            .Must(usage => AllowedUsages.Contains(usage));

        RuleFor(x => x.FileName)
            .NotEmpty()
            .MaximumLength(255);

        RuleFor(x => x.ContentType)
            .NotEmpty()
            .Must((request, contentType) => IsAllowedContentType(request.Usage, contentType));

        RuleFor(x => x.SizeBytes)
            .GreaterThan(0)
            .Must((request, sizeBytes) => sizeBytes <= GetMaxSizeBytes(request.Usage));
    }

    // Avatar uploads stay image-only and small. Post/campaign media can be larger because videos need more room.
    private static long GetMaxSizeBytes(string usage)
    {
        return usage == "avatar"
            ? 2 * 1024 * 1024
            : 100 * 1024 * 1024;
    }

    private static bool IsAllowedContentType(string usage, string contentType)
    {
        if (usage == "avatar")
        {
            return AllowedImageTypes.Contains(contentType);
        }

        return AllowedImageTypes.Contains(contentType) ||
               AllowedVideoTypes.Contains(contentType);
    }
}
