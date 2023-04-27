import { CloudinaryUploadResponse } from "./types";

export async function uploadProfilePicture(formData: FormData): Promise<CloudinaryUploadResponse> {
  const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });

  return await response.json();
}

export async function uploadFile(formData: FormData): Promise<CloudinaryUploadResponse> {
  const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  return data;
}

