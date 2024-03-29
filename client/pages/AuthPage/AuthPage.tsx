import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Header from "../../components/Header/Header";
import SignInForm from "../../components/SignInForm/SignInForm";
import StudentSignUpForm from "../../components/StudentSignUpForm/StudentSignUpForm";
import TeacherAuth from "../../components/TeacherAuth/TeacherAuth";
import styles from './authPage.module.css';

export default function AuthPage() {
  const { method, accountType } = useParams();
  const [searchParams] = useSearchParams();
  const callback: string | null = searchParams.get('callback');
  const { user, doneGettingUser } = useUserContext();

  if (doneGettingUser && user) {
    if (callback) return <Navigate to={`${callback}`} />
    return <Navigate to={user.type === 'student' ? '/find-teachers' : '/my-students'} />
  }

  return (
    <>
      <Header />
      <div>

        {method === 'sign-in' ?
          <div className={styles.formContainer}>
            <SignInForm />
          </div>
            :
            <>
              {!accountType && <Navigate to='/auth/sign-up/student'/>}
              {accountType == 'student' &&
                <StudentSignUpForm/>
              }
              {accountType == 'teacher' &&
                <TeacherAuth />
              }
            </>
        }
      </div>
    </>
  );
}