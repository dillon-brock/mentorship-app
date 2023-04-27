import Connection from "../server/models/Connection";

export type EmptyObject = {};

export interface ConnectionData extends Connection {
  subjectId: string;
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

export type TeacherProfile = {
  bio: string;
  contactEmail: string;
  phoneNumber: string;
  zipCode: string;
  firstName: string;
  lastName: string;
}

export type ZipCodeListResponse = {
  zip_codes: string[];
  valid: true;
}

export type ZipCodeErrorResponse = {
  error_code: number;
  valid: false;
}

export type ZipCodeRadiusArgs = {
  zipCode: string;
  radius: string;
}

type Timezone = {
  timezone_identifier: string;
  timezone_abbr: string;
  utc_offset_sec: number;
  is_dst: string;
}

export type ZipCodeCityResponse = {
  valid: true;
  zip_code: string;
  lat: number;
  lng: number;
  city: string;
  state: string;
  timezone: Timezone;
  acceptable_city_names: string[];
  area_codes: number[];
}

export type CityErrorResponse =  {
  error_msg: string;
  valid: false;
}

export type DatabaseErrorResponse = {
  status: number;
  message: string;
}
