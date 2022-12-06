import { NewSubjectInfo, SubjectFromDatabase, UpdateSubjectInfo } from "../types/subjectTypes.js";
import pool from "../database.js";
import TeachingMaterial from "./TeachingMaterial.js";

export default class Subject {
  id: string;
  teacherId: string;
  subject: string;
  minPrice: number;
  maxPrice: number;
  lessonType: string;
  teachingMaterials?: Array<TeachingMaterial>

  constructor(row: SubjectFromDatabase) {
    this.id = row.id;
    this.teacherId = row.teacher_id;
    this.subject = row.subject;
    this.minPrice = row.min_price;
    this.maxPrice = row.max_price;
    this.lessonType = row.lesson_type;
    if (row.teaching_materials) this.teachingMaterials = row.teaching_materials
  }

  static async create({ teacherId, subject, minPrice, maxPrice, lessonType }: NewSubjectInfo): Promise<Subject | null> {
    const { rows } = await pool.query(
      `INSERT INTO subjects (teacher_id, subject, min_price, max_price, lesson_type)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`,
      [teacherId, subject, minPrice, maxPrice, lessonType]
    );

    if (!rows[0]) return null;
    return new Subject(rows[0]);
  }

  static async findById(id: string): Promise<Subject | null> {
    const { rows } = await pool.query(
      `SELECT * FROM subjects
      WHERE id = $1`,
      [id]
    );

    if (!rows[0]) return null;
    return new Subject(rows[0]);
  }

  static async findByTeacherId(teacherId: string): Promise<Array<Subject> | null> {
    const { rows } = await pool.query(
      `SELECT * FROM subjects
      WHERE teacher_id = $1`,
      [teacherId]
    );
    return rows.map(row => new Subject(row));
  }

  static async getTeachingMaterialsByTeacherId(teacherId: string): Promise<Array<Subject>> {
    const { rows } = await pool.query(
      `SELECT subjects.*,
      COALESCE(
        json_agg(json_build_object('id', teaching_materials.id, 'subjectId', teaching_materials.subject_id, 'url', teaching_materials.url, 'type', teaching_materials.type, 'name', teaching_materials.name, 'createdAt', teaching_materials.created_at))
        FILTER (WHERE teaching_materials.id IS NOT NULL), '[]'
      ) as teaching_materials from subjects
      LEFT JOIN teaching_materials ON teaching_materials.subject_id = subjects.id
      WHERE subjects.teacher_id = $1
      GROUP BY subjects.id`,
      [teacherId]
    );

    return rows.map(row => new Subject(row));
  }

  static async updateById({ id, minPrice, maxPrice, lessonType }: UpdateSubjectInfo): Promise<Subject> {
    const { rows } = await pool.query(
      `UPDATE subjects
      SET min_price = $1, max_price = $2, lesson_type = $3
      WHERE id = $4
      RETURNING *`,
      [minPrice, maxPrice, lessonType, id]
    );

    return new Subject(rows[0]);
  }
}