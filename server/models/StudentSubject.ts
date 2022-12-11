import { newStudentSubjectInfo, studentSubjectFromDatabase } from "../types/studentSubjectTypes.js";
import pool from "../database.js";

export default class StudentSubject {
  id: string;
  studentId: string;
  subjectId: string;

  constructor(row: studentSubjectFromDatabase) {
    this.id = row.id;
    this.studentId = row.student_id;
    this.subjectId = row.subject_id;
  }

  static async create({ studentId, subjectId }: newStudentSubjectInfo): Promise<StudentSubject> {
    const { rows } = await pool.query(
      `INSERT INTO students_subjects (student_id, subject_id)
      VALUES ($1, $2)
      RETURNING *`,
      [studentId, subjectId]
    );

    return new StudentSubject(rows[0]);
  }

  static async delete(studentId: string, subjectId: string): Promise<StudentSubject> {
    const { rows } = await pool.query(
      `DELETE FROM students_subjects
      WHERE student_id = $1 AND subject_id = $2
      RETURNING *`,
      [studentId, subjectId]
    );

    return new StudentSubject(rows[0]);
  }


}