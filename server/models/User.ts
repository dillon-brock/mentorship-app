import { HashedUserFormInput, UserFromDatabase } from "../../common/userTypes";
import pool from "../database";

export class User {
  id: string;
  email: string;
  #passwordHash: string;
  type: string;

  constructor(row: UserFromDatabase) {
    this.id = row.id;
    this.email = row.email;
    this.#passwordHash = row.password_hash;
    this.type = row.type;
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
}