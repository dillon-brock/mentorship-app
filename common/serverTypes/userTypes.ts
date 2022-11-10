export type UserFromDatabase = {
  id: string;
  email: string;
  password_hash: string;
  type: string | null;
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