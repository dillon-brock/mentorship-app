import { SubjectFromDatabase } from "../../common/serverTypes/subjectTypes.js";

export default class Subject {
  id: string;
  teacherId: string;
  subject: string;
  minPrice: number;
  maxPrice: number;
  lessonType: string;

  constructor(row: SubjectFromDatabase) {
    this.id = row.id;
    this.teacherId = row.teacher_id;
    this.subject = row.subject;
    this.minPrice = row.min_price;
    this.maxPrice = row.max_price;
    this.lessonType = row.lesson_type;
  }
}