import { NewTeacherInfo, TeacherFromDatabase } from "../../common/serverTypes/teacherTypes";
import pool from "../database.js";

export default class Teacher {
  id: string;
  userId: string;
  bio: string | null;
  zipCode: string;
  city: string | null;
  state: string | null;
  phoneNumber: string | null;
  contactEmail: string | null;
  firstName: string;
  lastName: string;
  imageUrl: string;
  subjects?: Array<string>;

  constructor({ id, user_id, bio, zip_code, phone_number, contact_email, first_name, last_name, image_url, city, state, subjects }: TeacherFromDatabase) {
    this.id = id;
    this.userId = user_id;
    this.bio = bio;
    this.zipCode = zip_code;
    this.city = city;
    this.state = state;
    this.phoneNumber = phone_number;
    this.contactEmail = contact_email;
    this.firstName = first_name;
    this.lastName = last_name;
    this.imageUrl = image_url;
    if (subjects) this.subjects = subjects;
  }

  static async create({ userId, bio = null, zipCode, phoneNumber = null, contactEmail = null, firstName, lastName, imageUrl, city, state }: NewTeacherInfo): Promise<Teacher | null> {
    const { rows } = await pool.query(
      `INSERT INTO teachers (user_id, bio, zip_code, phone_number, contact_email, first_name, last_name, image_url, city, state)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *`,
      [
        userId,
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

  static async findAll(): Promise<Array<Teacher>> {
    const { rows } = await pool.query(
      `SELECT teachers.*, ARRAY_AGG(subject) AS subjects FROM teachers
      INNER JOIN subjects ON subjects.teacher_id = teachers.id
      GROUP BY teachers.id`
    );

    return rows.map((row: TeacherFromDatabase) => new Teacher(row));
  }

  static async findById(id: string): Promise<Teacher | null> {
    const { rows } = await pool.query(
      `SELECT ARRAY_AGG(subject) AS subjects, teachers.* FROM teachers
      INNER JOIN subjects ON subjects.teacher_id = teachers.id
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
      SET bio = $1,
      zip_code = $2,
      city = $3, 
      state = $4,
      phone_number = $5,
      contact_email = $6,
      first_name = $7,
      last_name = $8,
      image_url = $9
      WHERE user_id = $10
      RETURNING *
      `,
      [bio, zipCode, city, state, phoneNumber, contactEmail, firstName, lastName, imageUrl, userId]
    );
    if (!rows[0]) return null;
    return new Teacher(rows[0]);
  }

}