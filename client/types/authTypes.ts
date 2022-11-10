export type StudentSignUpInfo = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export type TeacherSignUpInfo = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  subject: string;
  bio: string | null;
  zipCode: string;
  phoneNumber: string | null;
  contactEmail: string | null;
}