export type TeacherFromDatabase = {
  id: string;
  user_id: string;
  subject: string;
  first_name: string;
  last_name: string;
  image_url: string;
  bio: string;
  zip_code: string;
  phone_number: string;
  contact_email: string;
  avg_rating?: number;
}

export type NewTeacherInfo = {
  userId: string;
  subject: string;
  bio: string | null;
  zipCode: string;
  phoneNumber: string | null;
  contactEmail: string | null;
  firstName: string;
  lastName: string;
  imageUrl: string;
}