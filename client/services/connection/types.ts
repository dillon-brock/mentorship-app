export type ConnectionUpdateInfo = {
  teacherId: string;
  studentId: string;
  connectionStatus: string;
}

export type DeleteConnectionInfo = {
  id: string;
  studentId: string;
  subjectId: string;
}