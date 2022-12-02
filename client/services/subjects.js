export async function getSubjectsByTeacherId(teacherId) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/subjects/${teacherId}`, {
    credentials: 'include',
    headers: {
      'Accept': 'application/json'
    }
  });

  const subjects = await response.json();
  return subjects;
}

export async function addSubject({ subject, minPrice, maxPrice, lessonType }) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/subjects`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      subject,
      minPrice,
      maxPrice,
      lessonType
    })
  });

  const newSubject = await response.json();
  return newSubject;
}

export async function updateSubject({ id, minPrice, maxPrice, lessonType }) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/subjects/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      minPrice,
      maxPrice,
      lessonType
    })
  });

  const updatedSubject = await response.json();
  return updatedSubject;
}