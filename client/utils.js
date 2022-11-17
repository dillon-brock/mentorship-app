export function getAverageRating(reviews) {
  return reviews.reduce((a, b) => a + b.stars, 0) / reviews.length;
}