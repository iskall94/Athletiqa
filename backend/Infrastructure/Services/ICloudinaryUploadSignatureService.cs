using backend.Features.Uploads.CreateUploadSignature;

namespace backend.Infrastructure.Services;

/// <summary>Given a validated upload request, and the current userId, return the signed Cloudinary upload data.</summary>
public interface ICloudinaryUploadSignatureService
{
    CreateUploadSignatureResponse CreateSignature(
        CreateUploadSignatureRequest request,
        string userId
    );
}
