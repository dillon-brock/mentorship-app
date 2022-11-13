import { ConnectionFromDatabase } from "../../common/serverTypes/connectionTypes.js";
import pool from "../database.js";

export default class Connection {
  id: string;
  studentId: string;
  teacherId: string;
  connectionApproved: string;

  constructor(row: ConnectionFromDatabase) {
    this.id = row.id;
    this.studentId = row.student_id;
    this.teacherId = row.teacher_id;
    this.connectionApproved = row.connection_approved;
  }

  static async findByIds(teacherId: string, studentId: string): Promise<Connection | null> {
    const { rows } = await pool.query(
      `SELECT * FROM teachers_students
      WHERE teacher_id = $1 and student_id = $2`,
      [teacherId, studentId]
    );

    if (!rows[0]) return null;
    return new Connection(rows[0]);
  }
}