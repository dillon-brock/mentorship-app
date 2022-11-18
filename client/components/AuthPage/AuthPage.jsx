import { Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Header from "../Header/Header";
import SignInForm from "../SignInForm/SignInForm";
import SignUpForm from "../SignUpForm/SignUpForm";

export default function AuthPage() {
  const { method, accountType } = useParams();
  const { user, doneGettingUser } = useUserContext();

  if (doneGettingUser && user) {
    return <Navigate to={user.type === 'student' ? '/find-teachers' : '/my-students'} />
  }

  return (
    <>
      <Header />
      {method === 'sign-in' ?
        <SignInForm />
        :
        <SignUpForm accountType={accountType} />
      }
    </>
  );
}