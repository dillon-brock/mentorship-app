import TeachingMaterial from "../models/TeachingMaterial";

export type SubjectFromDatabase = {
  id: string;
  teacher_id: string;
  subject: string;
  min_price: number;
  max_price: number;
  lesson_type: string;
  teaching_materials?: Array<TeachingMaterial>
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

export type UpdateSubjectInfo = {
  id: string;
  minPrice: number;
  maxPrice: number;
  lessonType: string;
}