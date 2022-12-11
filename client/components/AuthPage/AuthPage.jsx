import { Container } from "react-bootstrap";
import { Navigate, useParams, useSearchParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Header from "../Header/Header";
import SignInForm from "../SignInForm/SignInForm";
import StudentSignUpForm from "../StudentSignUpForm/StudentSignUpForm";
import TeacherAuth from "../TeacherAuth/TeacherAuth";
// import background from './squiggle_background.png';
import styles from './authPage.module.css';

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
      <div>

        {method === 'sign-in' ?
          <div className={styles.formContainer}>
            <SignInForm />
          </div>
            :
            <>
              {!accountType && <Navigate to='/auth/sign-up/student'/>}
              {accountType == 'student' &&
                <div className={styles.formContainer}>
                  <StudentSignUpForm/>
                </div>
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