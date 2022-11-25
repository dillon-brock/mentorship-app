export async function addStudentAccount({ firstName, lastName, imageUrl }) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/students/add-account`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      firstName,
      lastName,
      imageUrl
    })
  })

  const newStudentInfo = await response.json();
  if (response.ok) return newStudentInfo;
}