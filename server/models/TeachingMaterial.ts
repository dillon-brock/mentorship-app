import pool from "../database.js";
import { NewTeachingMaterialInfo, TeachingMaterialFromDatabase, UpdateTeachingMaterialInfo } from "../types/teachingMaterialTypes";

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

  static async findById(id: string): Promise<TeachingMaterial | null> {
    const { rows } = await pool.query(
      `SELECT * FROM teaching_materials
      WHERE id = $1`,
      [id]
    );
    if (!rows[0]) return null;
    return new TeachingMaterial(rows[0]);
  }

  static async findByTeacherId(teacherId: string): Promise<Array<TeachingMaterial>> {
    const { rows } = await pool.query(
      `SELECT teaching_materials.* FROM teachers
      INNER JOIN subjects ON subjects.teacher_id = teachers.id
      INNER JOIN teaching_materials ON teaching_materials.subject_id = subjects.id
      WHERE teachers.id = $1`,
      [teacherId]
    );

    return rows.map(row => new TeachingMaterial(row));
  }

  static async delete(id: string): Promise<TeachingMaterial | null> {
    const { rows } = await pool.query(
      `DELETE FROM teaching_materials
      WHERE id = $1
      RETURNING *`,
      [id]
    );

    if (!rows[0]) return null;
    return new TeachingMaterial(rows[0]);
  }

  static async updateById({ id, subjectId, url, name }: UpdateTeachingMaterialInfo): Promise<TeachingMaterial> {
    const { rows } = await pool.query(
      `UPDATE teaching_materials
      SET subject_id = $1, url = $2, name = $3
      WHERE id = $4
      RETURNING *`,
      [subjectId, url, name, id]
    );

    return new TeachingMaterial(rows[0]);
  }
}