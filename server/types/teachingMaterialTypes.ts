export type TeachingMaterialFromDatabase = {
  id: string;
  subject_id: string;
  url: string;
  type: string;
  name?: string;
  created_at: string;
}

export type NewTeachingMaterialInfo = {
  subjectId: string;
  url: string;
  type: string;
  name: string | null;
}

export type UpdateTeachingMaterialInfo = {
  id: string;
  subjectId: string;
  url: string;
  name: string | null;
}