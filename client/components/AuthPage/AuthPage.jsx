import { Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";

export default function AuthPage() {
  const { method, accountType } = useParams();
  const { user, setUser } = useUserContext();
  if (user) {
    return <Navigate to={user.type === 'student' ? '/find-teachers' : '/my-students'} />
  }

  return (
    <>
      {method === 'sign-in' ?
        <SignInForm />
        :
        <SignUpForm accountType={accountType} />
      }
    </>
  );
}