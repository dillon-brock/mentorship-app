export async function createConnection(teacherId) {
  const response = await fetch(`${process.env.API_FETCH_URL}/connections`, {
    credentials: "include",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      teacherId
    })
  })

  if (response.ok) {
    return response;
  }
}