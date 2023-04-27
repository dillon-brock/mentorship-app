import { Dispatch, SetStateAction } from "react";
import Subject from "../../../server/models/Subject";

export type FormErrors = {
  zipCode?: string;
  bio?: string;
}

export type Props = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  subjects: Subject[];
  setUser: Dispatch<SetStateAction<boolean>>;
  newUser: boolean;
  user: any;
}