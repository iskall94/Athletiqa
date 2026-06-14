import { apiFetch } from "../base/apiClient";

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
const allowedVideoTypes = ["video/mp4", "video/webm", "video/quicktime"];

const maxFileSizes = {
  avatar: 2 * 1024 * 1024,
  "post-media": 100 * 1024 * 1024,
  "campaign-media": 100 * 1024 * 1024,
};

export async function getUploadSignature(file, usage) {
  validateMediaFile(file, usage);

  return apiFetch("/api/uploads/signature", {
    method: "POST",
    body: JSON.stringify({
      usage,
      fileName: file.name,
      contentType: file.type,
      sizeBytes: file.size,
    }),
  });
}

export async function uploadToCloudinary(file, signatureData) {
  // FormData instead of JSON since Cloudinary expects multipart/form-data
  const formData = new FormData();

  // We append the file and the signature data required. For example the signature to ensure our backend approved the request.
  formData.append("file", file);
  formData.append("api_key", signatureData.apiKey);
  formData.append("timestamp", signatureData.timestamp);
  formData.append("signature", signatureData.signature);
  formData.append("folder", signatureData.folder);
  formData.append("public_id", signatureData.publicId);

  const response = await fetch(signatureData.uploadUrl, {
    method: "POST",
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error("Uppladdningen misslyckades");
  }

  return {
    secure_url: data.secure_url,
    public_id: data.public_id,
    resource_type: data.resource_type ?? signatureData.resourceType,
  };
}

// Helper to quickly validate the image file before we upload it.
function validateMediaFile(file, usage) {
  if (!isAllowedType(file.type, usage)) {
    throw new Error("Filtypen stöds inte.");
  }

  const maxSize = maxFileSizes[usage];

  if (!maxSize) {
    throw new Error("Uppladdningen misslyckades");
  }

  if (file.size > maxSize) {
    throw new Error(
      `Filen är för stor. Maxstorlek är ${maxSize / (1024 * 1024)} MB.`,
    );
  }
}

// Client-side validation before we ask the backend for a signature
function isAllowedType(contentType, usage) {
  if (usage === "avatar") {
    return allowedImageTypes.includes(contentType);
  }

  return (
    allowedImageTypes.includes(contentType) ||
    allowedVideoTypes.includes(contentType)
  );
}
