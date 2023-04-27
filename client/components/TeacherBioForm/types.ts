import { Dispatch, SetStateAction } from "react";
import { NumberedSubject } from "../../types";

export type FormErrors = {
  zipCode?: string;
  bio?: string;
}

export interface Props {
  subjects: NumberedSubject[];
  setUser: Dispatch<SetStateAction<boolean>>;
  newUser: boolean;
  user: any;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}