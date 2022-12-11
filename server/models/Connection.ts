import { ConnectionFromDatabase, ConnectionUpdate, NewConnection } from "../types/connectionTypes.js";
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

  static async findById(id: string): Promise<Connection | null> {
    const { rows } = await pool.query(
      `SELECT * FROM teachers_students
      WHERE id = $1`,
      [id]
    );
    
    if (!rows[0]) return null;
    return new Connection(rows[0]);
  }

  static async create({ teacherId, studentId, connectionApproved = 'pending' }: NewConnection): Promise<Connection> {
    const { rows } = await pool.query(
      `INSERT INTO teachers_students (teacher_id, student_id, connection_approved)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [teacherId, studentId, connectionApproved]
    );
    return new Connection(rows[0]);
  }

  static async update({ studentId, teacherId, connectionStatus}: ConnectionUpdate): Promise<Connection> {
    const { rows } = await pool.query(
      `UPDATE teachers_students
      SET connection_approved = $1
      WHERE student_id = $2 AND teacher_id = $3
      RETURNING *`,
      [connectionStatus, studentId, teacherId]
    );

    return new Connection(rows[0]);
  }
}