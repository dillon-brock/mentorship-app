export type SubjectFromDatabase = {
  id: string;
  teacher_id: string;
  subject: string;
  min_price: number;
  max_price: number;
  lesson_type: string;
}

export type NewSubjectInfo = {
  teacherId: string;
  subject: string;
  minPrice: number;
  maxPrice: number;
  lessonType: string;
}

export type AggregatedSubject = {
  id: string;
  subject: string;
  minPrice: number;
  maxPrice: number;
  lessonType: string;
}