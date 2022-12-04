import { NewStudentInfo, StudentFromDatabase } from "../types/studentTypes.js";
import pool from "../database.js";
import Teacher from "./Teacher.js";

export default class Student {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  teachers?: Array<Teacher>
  connectionApproved?: string;
  subject?: string;

  constructor(row: StudentFromDatabase) {
    this.id = row.id;
    this.userId = row.user_id;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.imageUrl = row.image_url;
    if (row.teachers) this.teachers = row.teachers.length ? row.teachers : [];
    if (row.connection_approved) this.connectionApproved = row.connection_approved;
    if (row.subject) this.subject = row.subject;
  }

  static async create({ userId, firstName, lastName, imageUrl }: NewStudentInfo): Promise<Student> {
    const { rows } = await pool.query(
      `INSERT INTO students (user_id, first_name, last_name, image_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *`,
      [userId, firstName, lastName, imageUrl]
    );

    return new Student(rows[0]);
  }
  
  static async findByTeacherId(teacherId: string): Promise<Array<Student> | null> {
    const { rows } = await pool.query(
      `SELECT students.*, teachers_students.connection_approved, subjects.subject FROM students
      INNER JOIN teachers_students ON teachers_students.student_id = students.id
      INNER JOIN students_subjects ON students_subjects.student_id = students.id
      INNER JOIN subjects ON subjects.id = students_subjects.subject_id
      WHERE teachers_students.teacher_id = $1`,
      [teacherId]
    );

    if (!rows[0]) return null;
    return rows.map(row => new Student(row));
  }

  static async findByUserId(userId: string): Promise<Student | null> {
    const { rows } = await pool.query(
      `SELECT * FROM students
      WHERE user_id = $1`,
      [userId]
    );

    if (!rows[0]) return null;
    return new Student(rows[0]);
  }

  static async findById(id: string): Promise<Student | null > {
    const { rows } = await pool.query(
      `SELECT * FROM students
      WHERE id = $1`,
      [id]
    );

    if (!rows[0]) return null;
    return new Student(rows[0]);
  }

  static async updateByUserId({ userId, firstName, lastName, imageUrl }: NewStudentInfo): Promise<Student | null> {
    const { rows } = await pool.query(
      `UPDATE students
      SET first_name = $1,
      last_name = $2,
      image_url = $3
      WHERE user_id = $4
      RETURNING *`,
      [firstName, lastName, imageUrl, userId]
    );
    if (!rows[0]) return null;
    return new Student(rows[0]);
  }
}