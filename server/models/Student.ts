import { NewStudentInfo, StudentFromDatabase } from "../../common/serverTypes/studentTypes.js";
import pool from "../database.js";
import Teacher from "./Teacher.js";

export default class Student {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  teachers?: Array<Teacher>

  constructor(row: StudentFromDatabase) {
    this.id = row.id;
    this.userId = row.user_id;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.imageUrl = row.image_url;
    if (row.teachers) this.teachers = row.teachers.length ? row.teachers : [];
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
      `SELECT students.*, teachers_students.connection_approved FROM students
      INNER JOIN teachers_students ON teachers_students.student_id = students.id
      WHERE teachers_students.teacher_id = $1`,
      [teacherId]
    );

    if (!rows[0]) return null;
    return rows.map(row => new Student(row));
  }
}