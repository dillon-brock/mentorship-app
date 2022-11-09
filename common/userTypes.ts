export type UserFromDatabase = {
  id: string;
  email: string;
  password_hash: string;
  type: string;
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