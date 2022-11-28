import { NewSubjectInfo, SubjectFromDatabase } from "../../common/serverTypes/subjectTypes.js";
import pool from "../database.js";

export default class Subject {
  id: string;
  teacherId: string;
  subject: string;
  minPrice: number;
  maxPrice: number;
  lessonType: string;

  constructor(row: SubjectFromDatabase) {
    this.id = row.id;
    this.teacherId = row.teacher_id;
    this.subject = row.subject;
    this.minPrice = row.min_price;
    this.maxPrice = row.max_price;
    this.lessonType = row.lesson_type;
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
}