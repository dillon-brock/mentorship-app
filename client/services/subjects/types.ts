export interface SubjectData {
  minPrice: number;
  maxPrice: number;
  lessonType: string;
}

export interface NamedSubject extends SubjectData {
  subject: string;
}

export interface SubjectUpdateData extends SubjectData {
  id: string;
}