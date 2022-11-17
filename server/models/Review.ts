import { NewReview, ReviewFromDatabase } from "../../common/serverTypes/reviewTypes.js";
import pool from "../database.js";

export default class Review {
  id: string;
  teacherId: string;
  studentId: string | null;
  stars: number;
  detail: string | null;
  createdAt: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;

  constructor(row: ReviewFromDatabase) {
    this.id = row.id;
    this.teacherId = row.teacher_id;
    this.studentId = row.student_id;
    this.stars = row.stars;
    this.detail = row.detail;
    this.createdAt = row.created_at;
    if (row.first_name) this.firstName = row.first_name;
    if (row.last_name) this.lastName = row.last_name;
    if (row.image_url) this.imageUrl = row.image_url;
  }

  static async findByTeacherId(teacherId: string): Promise<Array<Review>> {
    const { rows } = await pool.query(
      `SELECT reviews.*, students.first_name, students.last_name, students.image_url FROM reviews
      LEFT JOIN students ON reviews.student_id = students.id
      WHERE reviews.teacher_id = $1`,
      [teacherId]
    );

    return rows.map(row => new Review(row));
  }

  static async create({ studentId = null, stars, detail, teacherId }: NewReview): Promise<Review> {
    const { rows } = await pool.query(
      `INSERT INTO reviews (stars, detail, student_id, teacher_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [stars, detail, studentId, teacherId]
    );

    return new Review(rows[0]);
  }
}