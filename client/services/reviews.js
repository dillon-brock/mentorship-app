export async function getReviews(id) {
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/teachers/${id}/reviews`, {
    credentials: "include",
    headers: {
      "Accept": "application/json"
    }
  });

  const reviews = await response.json();
  if (response.ok) {
    return reviews;
  }
}