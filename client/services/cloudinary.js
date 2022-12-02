export async function uploadProfilePicture(formData) {
  const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, {
    method: 'POST',
    body: formData
  });

  return await response.json();
}

export async function uploadFile(formData) {
  console.log(formData.get('file'));
  const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  console.log(data);
  return data;
}

