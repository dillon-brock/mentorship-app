import { useParams } from "react-router-dom";
import SignUpForm from "../SignUpForm/SignUpForm";

export default function AuthPage(): JSX.Element {
  const { method, accountType } = useParams();
  return (
    <>
      <SignUpForm accountType={accountType} />
    </>
  );
}