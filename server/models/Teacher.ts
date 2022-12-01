import { AggregatedSubject } from "../types/subjectTypes";
import { NewTeacherInfo, TeacherFromDatabase } from "../types/teacherTypes";
import pool from "../database.js";
import TeachingMaterial from "./TeachingMaterial.js";

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
  subjects?: Array<AggregatedSubject>;
  teachingMaterials?: Array<TeachingMaterial>

  constructor(row: TeacherFromDatabase) {
    this.id = row.id;
    this.userId = row.user_id;
    this.bio = row.bio;
    this.zipCode = row.zip_code;
    this.city = row.city;
    this.state = row.state;
    this.phoneNumber = row.phone_number;
    this.contactEmail = row.contact_email;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.imageUrl = row.image_url;
    if (row.subjects) this.subjects = row.subjects;
    if (row.teaching_materials) this.teachingMaterials = row.teaching_materials;
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
      `SELECT teachers.*,
      COALESCE(
        json_agg(json_build_object('id', subjects.id, 'subject', subjects.subject, 'minPrice', subjects.min_price, 'maxPrice', subjects.max_price, 'lessonType', subjects.lesson_type))
        FILTER (WHERE subjects.id IS NOT NULL), '[]'
        ) as subjects from teachers
        LEFT JOIN subjects ON subjects.teacher_id = teachers.id 
        GROUP BY teachers.id`
    );

    return rows.map((row: TeacherFromDatabase) => new Teacher(row));
  }

  static async findById(id: string): Promise<Teacher | null> {
    const { rows } = await pool.query(
      `SELECT teachers.*,
      COALESCE(
        json_agg(json_build_object('id', subjects.id, 'subject', subjects.subject, 'minPrice', subjects.min_price, 'maxPrice', subjects.max_price, 'lessonType', subjects.lesson_type))
        FILTER (WHERE subjects.id IS NOT NULL), '[]'
        ) as subjects from teachers
      LEFT JOIN subjects ON subjects.teacher_id = teachers.id
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

  static async findByStudentId(studentId: string): Promise<Array<Teacher>> {
    const { rows } = await pool.query(
      `SELECT teachers.* FROM teachers
      INNER JOIN teachers_students ON teachers_students.teacher_id = teachers.id
      INNER JOIN students ON students.id = teachers_students.student_id
      WHERE student_id = $1 AND connection_approved = 'approved'`,
      [studentId]
    );
    return rows.map(row => new Teacher(row));
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

  async getTeachingMaterials() {
    const { rows } = await pool.query(
      `SELECT COALESCE(
        json_agg(json_build_object('id', teaching_materials.id, 'subjectId', teaching_materials.subject_id, 'name', teaching_materials.name, 'type', teaching_materials.type, 'url', teaching_materials.url))
        FILTER (WHERE teaching_materials.id IS NOT NULL), '[]'
      ) as teaching_materials from teachers
      INNER JOIN teachers_students ON teachers_students.teacher_id = teachers.id
      INNER JOIN students ON students.id = teachers_students.student_id
      INNER JOIN students_subjects ON students_subjects.student_id = students.id
      INNER JOIN subjects ON subjects.id = students_subjects.subject_id
      LEFT JOIN teaching_materials ON teaching_materials.subject_id = subjects.id
      WHERE teachers.id = $1
      GROUP BY teachers.id`,
      [this.id]
    );

    this.teachingMaterials = rows[0].teaching_materials;
  }
}