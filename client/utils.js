export function getAverageRating(reviews) {
  return reviews.reduce((a, b) => a + b.stars, 0) / reviews.length;
}

export function checkForReviewMatch(studentId, teacherId, reviews) {
  const reviewMatch = reviews.find(review => review.teacherId === teacherId && review.studentId === studentId);
  return reviewMatch ? true : false;
}