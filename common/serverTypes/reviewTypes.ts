export type ReviewFromDatabase = {
  id: string;
  teacher_id: string;
  student_id: string | null;
  stars: number;
  detail: string | null;
}