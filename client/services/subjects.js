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