import pool from "../database";
import { NewTeachingMaterialInfo, TeachingMaterialFromDatabase } from "../types/teachingMaterialTypes";

export default class TeachingMaterial {
  id: string;
  subjectId: string;
  type: string;
  url: string;
  createdAt: string;
  name?: string;

  constructor(row: TeachingMaterialFromDatabase) {
    this.id = row.id;
    this.subjectId = row.subject_id;
    this.type = row.type;
    this.url = row.url;
    this.createdAt = row.created_at;
    if (row.name) this.name = row.name;
  }

  static async create({ subjectId, url, type, name = null }: NewTeachingMaterialInfo): Promise<TeachingMaterial> {
    const { rows } = await pool.query(
      `INSERT INTO teaching_materials (subject_id, url, type, name)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [subjectId, url, type, name]
    );

    return new TeachingMaterial(rows[0]);
  }
}