namespace backend.Features.Uploads.CreateUploadSignature;

public record CreateUploadSignatureRequest(
    string Usage,
    string FileName,
    string ContentType,
    long SizeBytes
);