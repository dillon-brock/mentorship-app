import { HashedUserFormInput, UserFromDatabase } from "../types/userTypes";
import pool from "../database.js";

export class User {
  id: string;
  email: string;
  #passwordHash?: string;
  type: string | null;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  studentId?: string;
  teacherId?: string;

  constructor(row: UserFromDatabase) {
    this.id = row.id;
    this.email = row.email;
    this.type = row.type;
    if (row.password_hash) this.#passwordHash = row.password_hash;
    if (row.first_name) this.firstName = row.first_name;
    if (row.last_name) this.lastName = row.last_name;
    if (row.image_url) this.imageUrl = row.image_url;
    if (row.student_id) this.studentId = row.student_id;
    if (row.teacher_id) this.teacherId = row.teacher_id;
  }

  static async insert({ email, passwordHash, type }: HashedUserFormInput): Promise<User> {
    const { rows } = await pool.query(
      `
      INSERT INTO users (email, password_hash, type)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [email, passwordHash, type]
    );

    return new User(rows[0]);
  }

  static async createFromGoogle({ email, type }: { email: string, type: string }): Promise<User> {
    const { rows } = await pool.query(
      `INSERT INTO users (email, type)
      VALUES ($1, $2)
      RETURNING *`,
      [email, type]
    );

    return new User(rows[0]);
  }

  static async getByEmail(email: string): Promise<User | null> {
    const { rows } = await pool.query(
      `SELECT * FROM users
      WHERE email = $1`, [email]
    );

    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  get passwordHash(): string | undefined {
    return this.#passwordHash;
  }

  static async getById(id: string): Promise<User | null> {
    const { rows } = await pool.query(
      `SELECT * FROM users
      WHERE id = $1`,
      [id]
    );

    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  static async updateTypeById(id: string, type: string): Promise<User> {
    const { rows } = await pool.query(
      `UPDATE users
      SET type = $1
      WHERE id = $2
      RETURNING *`,
      [type, id]
    );

    return new User(rows[0]);
  }

  async getAdditionalInfo() {
    let query: string = '';
    if (this.type === 'student') {
      query = `SELECT users.*, students.id AS student_id, students.first_name, students.last_name, students.image_url, teachers.id AS teacher_id FROM users
      INNER JOIN students ON students.user_id = users.id
      LEFT JOIN teachers ON teachers.user_id = users.id
      WHERE users.id = $1` 
    }
    if (this.type === 'teacher') {
      query = `SELECT users.*, teachers.id AS teacher_id, teachers.first_name, teachers.last_name, teachers.image_url, students.id AS student_id FROM users
      INNER JOIN teachers ON teachers.user_id = users.id
      LEFT JOIN students ON students.user_id = users.id
      WHERE users.id = $1`
    }

    const { rows } = await pool.query(query, [this.id]);
    return new User(rows[0]);
  }
}