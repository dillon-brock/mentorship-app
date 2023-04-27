import { Dispatch, SetStateAction } from "react";
import { NumberedSubject } from "../../types";

export type FormErrors = {
  zipCode?: string;
  bio?: string;
}

export type Props = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  subjects: NumberedSubject[];
  setUser: Dispatch<SetStateAction<boolean>>;
  newUser: boolean;
  user: any;
}