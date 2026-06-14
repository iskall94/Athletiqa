namespace backend.Features.Uploads.CreateUploadSignature;

public record CreateUploadSignatureResponse(
    string CloudName,
    string ApiKey,
    long Timestamp,
    string Signature,
    string Folder,
    string PublicId,
    string ResourceType,
    string UploadUrl
);