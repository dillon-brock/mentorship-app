export type ReviewFromDatabase = {
  id: string;
  teacher_id: string;
  student_id: string | null;
  stars: number;
  detail: string | null;
  created_at: string;
  first_name?: string;
  last_name?: string;
  image_url?: string;
}

export type NewReview = {
  studentId: string | null;
  stars: string;
  detail: string;
  teacherId: string;
}