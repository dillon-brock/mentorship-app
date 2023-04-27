import { NumberedSubject } from "../../types";

export interface TeacherAccountData {
  firstName: string;
  lastName: string;
  imageUrl: string;
  bio: string | null;
  zipCode: string;
  phoneNumber: string | null;
  contactEmail: string | null;
  city: string;
  state: string;
}

export interface TeacherAccountWithSubjects extends TeacherAccountData {
  subjects: NumberedSubject[];
}