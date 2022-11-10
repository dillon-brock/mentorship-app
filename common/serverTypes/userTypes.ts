export type UserFromDatabase = {
  id: string;
  email: string;
  password_hash: string;
  type: string | null;
  first_name?: string;
  last_name?: string;
  image_url?: string;
}

export type UserFromSignUpForm = {
  email: string;
  password: string;
  type: string;
}

export type HashedUserFormInput = {
  email: string;
  passwordHash: string;
  type: string;
}

export type UserSignInInfo = {
  email: string;
  password: string;
}