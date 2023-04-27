import Connection from "../server/models/Connection";
import Subject from "../server/models/Subject";
import Teacher from "../server/models/Teacher";
import TeachingMaterial from "../server/models/TeachingMaterial";

export type EmptyObject = {};

export interface ConnectionData extends Connection {
  subjectId?: string;
}

export interface TeacherWithMaterials extends Teacher {
  teachingMaterials: TeachingMaterial[];
}