export type ConnectionFromDatabase = {
  id: string;
  student_id: string;
  teacher_id: string;
  connection_approved: string;
}

export type NewConnection = {
  studentId: string;
  teacherId: string;
  connectionApproved: string;
}