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

export async function postReview({ teacherId, studentId, stars, detail }) {
  console.log(stars, detail, studentId, teacherId);
  const response = await fetch(`${process.env.API_FETCH_URL}/api/v1/reviews`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      teacherId,
      studentId,
      stars,
      detail
    })
  });

  const newReview = await response.json();
  if (response.ok) {
    return newReview;
  }
}