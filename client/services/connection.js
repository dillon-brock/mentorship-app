export async function createConnection(teacherId, studentId) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/connections`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      teacherId,
      studentId
    })
  })

  if (response.ok) {
    return await response.json();
  }
}