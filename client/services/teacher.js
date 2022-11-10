export async function getTeachers(subject) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/teachers?subject=${subject}`, {
    credentials: "include",
    headers: {
      "Accept": "application/json"
    }
  });

  const teachers = await response.json();
  if (response.ok) {
    return teachers;
  }
}