import { useState } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Header from "../Header/Header";
import SignInForm from "../SignInForm/SignInForm";
import StudentSignUpForm from "../StudentSignUpForm/StudentSignUpForm";
import TeacherAuth from "../TeacherAuth/TeacherAuth";

export default function AuthPage() {
  const { method, accountType } = useParams();
  const [searchParams] = useSearchParams();
  const callback = searchParams.get('callback');
  const { user, doneGettingUser } = useUserContext();

  if (doneGettingUser && user) {
    if (callback) return <Navigate to={`${callback}`} />
    return <Navigate to={user.type === 'student' ? '/find-teachers' : '/my-students'} />
  }

  return (
    <>
      <Header />
      {method === 'sign-in' ?
          <SignInForm />
          :
          <>
            {!accountType && <Navigate to='/auth/sign-up/student'/>}
            {accountType == 'student' &&
              <StudentSignUpForm />
            }
            {accountType == 'teacher' &&
              <TeacherAuth />
            }
          </>
      }
    </>
  );
}