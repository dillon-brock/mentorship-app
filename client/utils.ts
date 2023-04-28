import { Review } from "./types";

export function getAverageRating(reviews: Review[]): number {
  return reviews.reduce((a: number, b) => a + b.stars, 0) / reviews.length;
}

export function checkForReviewMatch(studentId: string, teacherId: string, reviews: Review[]): boolean {
  const reviewMatch = reviews.find(review => review.teacherId === teacherId && review.studentId === studentId);
  return reviewMatch ? true : false;
}