import { TeachingMaterialFromDatabase } from "../types/teachingMaterialTypes";

export default class TeachingMaterial {
  id: string;
  subjectId: string;
  type: string;
  url: string;
  createdAt: string;

  constructor(row: TeachingMaterialFromDatabase) {
    this.id = row.id;
    this.subjectId = row.subject_id;
    this.type = row.type;
    this.url = row.url;
    this.createdAt = row.created_at;
  }
}