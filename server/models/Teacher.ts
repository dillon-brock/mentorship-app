import { NewTeacherInfo, TeacherFromDatabase } from "../../common/serverTypes/teacherTypes";
import pool from "../database.js";

export default class Teacher {
  id: string;
  userId: string;
  subject: string;
  bio: string | null;
  zipCode: string;
  city: string | null;
  state: string | null;
  phoneNumber: string | null;
  contactEmail: string | null;
  firstName: string;
  lastName: string;
  imageUrl: string;
  avgRating?: number;

  constructor({ id, user_id, subject, bio, zip_code, phone_number, contact_email, first_name, last_name, image_url, avg_rating, city, state }: TeacherFromDatabase) {
    this.id = id;
    this.userId = user_id;
    this.subject = subject;
    this.bio = bio;
    this.zipCode = zip_code;
    this.city = city;
    this.state = state;
    this.phoneNumber = phone_number;
    this.contactEmail = contact_email;
    this.firstName = first_name;
    this.lastName = last_name;
    this.imageUrl = image_url;
    if (avg_rating) this.avgRating = avg_rating;
  }

  static async create({ userId, subject, bio = null, zipCode, phoneNumber = null, contactEmail = null, firstName, lastName, imageUrl, city, state }: NewTeacherInfo): Promise<Teacher | null> {
    const { rows } = await pool.query(
      `INSERT INTO teachers (user_id, subject, bio, zip_code, phone_number, contact_email, first_name, last_name, image_url, city, state)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`,
      [
        userId,
        subject,
        bio,
        zipCode,
        phoneNumber,
        contactEmail,
        firstName,
        lastName,
        imageUrl,
        city,
        state
      ]
    );
    
    if (!rows[0]) return null;
    return new Teacher(rows[0]);
  }

  static async findAll(subject: string = ''): Promise<Array<Teacher>> {
    subject = `${subject}%`
    const { rows } = await pool.query(
      `SELECT * FROM teachers
      WHERE subject ILIKE $1`,
      [subject]
    );

    return rows.map((row: TeacherFromDatabase) => new Teacher(row));
  }

  static async findById(id: string): Promise<Teacher | null> {
    const { rows } = await pool.query(
      `SELECT AVG(reviews.stars) as avg_rating, teachers.* FROM teachers
      LEFT JOIN reviews ON reviews.teacher_id = teachers.id
      WHERE teachers.id = $1
      GROUP BY teachers.id
      `, [id]
    );

    if (!rows[0]) return null;
    return new Teacher(rows[0]);
  }

  static async findByUserId(userId: string): Promise<Teacher | null> {
    const { rows } = await pool.query(
      `SELECT * FROM teachers
      WHERE user_id = $1`,
      [userId]
    );
    if (!rows[0]) return null;
    return new Teacher(rows[0]);
  }

  static async updateByUserId({
    userId,
    subject,
    bio,
    zipCode,
    city,
    state,
    phoneNumber,
    contactEmail,
    firstName,
    lastName,
    imageUrl
  }: NewTeacherInfo): Promise<Teacher | null> {
    const { rows } = await pool.query(
      `UPDATE teachers
      SET subject = $1,
      bio = $2,
      zip_code = $3,
      city = $4, 
      state = $5,
      phone_number = $6,
      contact_email = $7,
      first_name = $8,
      last_name = $9,
      image_url = $10
      WHERE user_id = $11
      RETURNING *
      `,
      [subject, bio, zipCode, city, state, phoneNumber, contactEmail, firstName, lastName, imageUrl, userId]
    );
    if (!rows[0]) return null;
    return new Teacher(rows[0]);
  }

}