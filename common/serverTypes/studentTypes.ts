import Teacher from "../../server/models/Teacher.js";

export type StudentFromDatabase = {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  image_url: string;
  teachers?: Array<Teacher>
  connection_approved?: string;
}

export type NewStudentInfo = {
  userId: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}