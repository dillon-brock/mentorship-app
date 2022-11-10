import { NewTeacherInfo, TeacherFromDatabase } from "../../common/teacherTypes";
import pool from "../database.js";

export default class Teacher {
  id: string;
  userId: string;
  subject: string;
  bio: string | null;
  zipCode: number;
  phoneNumber: string | null;
  contactEmail: string | null;
  firstName: string;
  lastName: string;
  imageUrl: string;

  constructor({ id, user_id, subject, bio, zip_code, phone_number, contact_email, first_name, last_name, image_url }: TeacherFromDatabase) {
    this.id = id;
    this.userId = user_id;
    this.subject = subject;
    this.bio = bio;
    this.zipCode = zip_code;
    this.phoneNumber = phone_number;
    this.contactEmail = contact_email;
    this.firstName = first_name;
    this.lastName = last_name;
    this.imageUrl = image_url;
  }

  static async create({ userId, subject, bio = null, zipCode, phoneNumber = null, contactEmail = null, firstName, lastName, imageUrl }: NewTeacherInfo): Promise<Teacher | null> {
    const { rows } = await pool.query(
      `INSERT INTO teachers (user_id, subject, bio, zip_code, phone_number, contact_email, first_name, last_name, image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *`,
      [userId, subject, bio, zipCode, phoneNumber, contactEmail, firstName, lastName, imageUrl]
    );
    
    if (!rows[0]) return null;
    return new Teacher(rows[0]);
  }

  static async findAll(): Promise<Array<Teacher> | null> {
    const { rows } = await pool.query(
      `SELECT * FROM teachers`
    );
    if (!rows[0]) return null;

    return rows.map(row => new Teacher(row));
  }
}