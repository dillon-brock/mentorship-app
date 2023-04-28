import { Dispatch, SetStateAction } from "react";
import { NumberedSubject } from "../../types";
import { User } from "../../context/UserContext";

export type FormErrors = {
  zipCode?: string;
  bio?: string;
}

export interface Props {
  subjects: NumberedSubject[];
  setUser: Dispatch<SetStateAction<User | null>>;
  newUser: boolean;
  user: any;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}