import { ExistingMaterial, NewMaterial } from "./types";

export async function addTeachingMaterial({ subjectId, url, type, name }: NewMaterial) {
  const response = await fetch(`/api/v1/teaching-materials`, {
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

export async function getTeachingMaterials() {
  const response = await fetch(`/api/v1/teaching-materials`, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  });

  const teachingMaterials = await response.json();
  return teachingMaterials;
}

export async function deleteTeachingMaterial(id: string) {
  const response = await fetch(`/api/v1/teaching-materials/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  });

  return await response.json();
}

export async function updateTeachingMaterial({ id, subjectId, url, name }: ExistingMaterial) {
  const response = await fetch(`/api/v1/teaching-materials/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      subjectId,
      url,
      name
    })
  });

  return await response.json();
}