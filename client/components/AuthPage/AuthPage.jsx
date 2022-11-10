import { useParams } from "react-router-dom";
import SignUpForm from "../SignUpForm/SignUpForm";

export default function AuthPage() {
  const { method, accountType } = useParams();
  return (
    <>
      <SignUpForm accountType={accountType} />
    </>
  );
}