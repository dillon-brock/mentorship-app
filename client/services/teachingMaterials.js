export async function addTeachingMaterial({ subjectId, url, type, name }) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/teaching-materials`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      subjectId,
      url,
      type,
      name
    })
  });

  const newTeachingMaterial = await response.json();
  return newTeachingMaterial;
}

export async function getTeachingMaterialsByTeacherId(teacherId) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/subjects/teaching-materials/${teacherId}`, {
    headers: {
      'Accept': 'application/json'
    }
  });

  const teachingMaterials = await response.json();
  return teachingMaterials;
}