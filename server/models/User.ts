import { HashedUserFormInput, UserFromDatabase } from "../../common/serverTypes/userTypes";
import pool from "../database.js";

export class User {
  id: string;
  email: string;
  #passwordHash: string;
  type: string | null;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;

  constructor(row: UserFromDatabase) {
    this.id = row.id;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
    this.type = row.type;
    if (row.first_name) this.firstName = row.first_name;
    if (row.last_name) this.lastName = row.last_name;
    if (row.image_url) this.imageUrl = row.image_url;
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

  static async getByEmail(email: string): Promise<User | null> {
    const { rows } = await pool.query(
      `SELECT * FROM users
      WHERE email = $1`, [email]
    );
    console.log(rows);
    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  get passwordHash(): string {
    return this.#passwordHash;
  }

  async getAdditionalInfo() {
    let query: string = '';
    if (this.type === 'student') {
      query = `SELECT users.*, students.first_name, students.last_name, students.image_url FROM users
      INNER JOIN students ON students.user_id = users.id
      WHERE users.id = $1` 
    }
    if (this.type === 'teacher') {
      query = `SELECT users.*, teachers.first_name, teachers.last_name, teachers.image_url FROM users
      INNER JOIN teachers ON teachers.user_id = users.id
      WHERE users.id = $1`
    }

    const { rows } = await pool.query(query, [this.id]);
    return new User(rows[0]);
  }
}