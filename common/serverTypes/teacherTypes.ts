export type TeacherFromDatabase = {
  id: string;
  user_id: string;
  subject: string;
  first_name: string;
  last_name: string;
  image_url: string;
  bio: string;
  zip_code: string;
  city: string | null;
  state: string | null;
  phone_number: string;
  contact_email: string;
  subjects?: Array<string>;
  avg_rating?: number;
}

export type NewTeacherInfo = {
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
}