import Connection from "../server/models/Connection";
import TeachingMaterial from "../server/models/TeachingMaterial";
import { AggregatedSubject } from "../server/types/subjectTypes";

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
  subjects?: Array<AggregatedSubject>;
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