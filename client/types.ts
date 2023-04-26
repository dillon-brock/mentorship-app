import Connection from "../server/models/Connection";

export type EmptyObject = {};

export interface ConnectionData extends Connection {
  subjectId?: string;
}