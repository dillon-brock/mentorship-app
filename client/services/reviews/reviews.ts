import { NewReviewData } from "./types";

export async function getReviews(id: string) {
  const response = await fetch(`/api/v1/reviews/${id}`, {
    headers: {
      "Accept": "application/json"
    }
  });

  const reviews = await response.json();
  if (response.ok) {
    return reviews;
  }
}

export async function postReview({ teacherId, stars, detail, anonymous }: NewReviewData) {
  const response = await fetch(`/api/v1/reviews`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      teacherId,
      anonymous,
      stars,
      detail
    })
  });

  const newReview = await response.json();
  if (response.ok) {
    return newReview;
  }
}