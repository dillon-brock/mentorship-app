import { ReviewFromDatabase } from "../../common/serverTypes/reviewTypes";
import pool from "../database";

export default class Review {
  id: string;
  teacherId: string;
  studentId: string | null;
  stars: number;
  detail: string | null;

  constructor(row: ReviewFromDatabase) {
    this.id = row.id;
    this.teacherId = row.teacher_id;
    this.studentId = row.student_id;
    this.stars = row.stars;
    this.detail = row.detail;
  }

  static async findByTeacherId(teacherId: string): Promise<Array<Review>> {
    const { rows } = await pool.query(
      `SELECT * FROM reviews
      WHERE teacher_id = $1`,
      [teacherId]
    );

    return rows.map(row => new Review(row));
  }
}