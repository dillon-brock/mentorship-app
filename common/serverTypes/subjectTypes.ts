export type SubjectFromDatabase = {
  id: string;
  teacher_id: string;
  subject: string;
  min_price: number;
  max_price: number;
  lesson_type: string;
}