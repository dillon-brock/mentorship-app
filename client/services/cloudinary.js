export async function uploadProfilePicture(formData) {
  const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });

  return await response.json();
}