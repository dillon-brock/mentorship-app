import Connection from "../server/models/Connection";

export type EmptyObject = {};

export interface ConnectionData extends Connection {
  subjectId?: string;
}

export interface Teacher {
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
  subjects?: Array<Subject>;
}

export interface TeacherWithSubjects extends Teacher {
  subjects: Subject[];
}

export interface TeacherWithMaterials extends Teacher {
  teachingMaterials: TeachingMaterial[];
}

export interface Student {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  teachers?: Array<Teacher>;
}

export interface CurrentStudent extends Student {
  connectionApproved: string;
  subject: string;
  connectionId: string;
  subjectId: string;
}

export interface Review {
  id: string;
  teacherId: string;
  studentId: string | null;
  stars: number;
  detail: string | null;
  anonymous: boolean;
  createdAt: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
}

export type Recipient = {
  userId: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export interface Subject {
  id: string;
  teacherId: string;
  subject: string;
  minPrice: number;
  maxPrice: number;
  lessonType: string;
}

export type NumberedSubject = {
  num: number;
  subject: string;
  minPrice: number;
  maxPrice: number;
  lessonType: string;
}

export type TeachingMaterial = {
  id: string;
  subjectId: string;
  type: string;
  url: string;
  createdAt: string;
  name?: string;
}

export interface SubjectWithMaterials extends Subject {
  teachingMaterials: Array<TeachingMaterial>
}

type LessonFormError = {
  num: number;
  message: string;
}

export type LessonFormErrors = {
  subject: LessonFormError | null;
  minPrice: LessonFormError | null;
  maxPrice: LessonFormError | null;
  lessonType: LessonFormError | null;
}

// bio
// contactEmail
// phoneNumber
// zipCode
// lastName
// firstName

export type TeacherProfile = {
  bio: string;
  contactEmail: string;
  phoneNumber: string;
  zipCode: string;
  firstName: string;
  lastName: string;
}