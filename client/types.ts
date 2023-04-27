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
  subjects?: Array<AggregatedSubject>
  teachingMaterials?: Array<TeachingMaterial>
}

export interface TeacherWithMaterials extends Teacher {
  teachingMaterials: TeachingMaterial[];
}