import { NumberedSubject, Student } from "../../types";

export type StudentSignUpInfo = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export type StudentSignUpResponse = {
  message: string;
  student: Student;
}

export type TeacherSignUpInfo = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio: string | null;
  zipCode: string;
  phoneNumber: string | null;
  contactEmail: string | null;
  imageUrl: string;
  city: string;
  state: string;
  subjects: NumberedSubject[];
}

export type UserSignUpInfo = {
  email: string;
  password: string;
  type: string;
}

export type SignInInfo = {
  email: string;
  password: string;
}