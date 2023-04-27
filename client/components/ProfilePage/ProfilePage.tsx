import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext"
import Header from "../Header/Header"
import StudentProfile from "../StudentProfile/StudentProfile";
import TeacherProfile from "../TeacherProfile/TeacherProfile";

export default function ProfilePage() {
  const { user, doneGettingUser } = useUserContext();
  const { pathname } = useLocation();
  if (!user && doneGettingUser) return <Navigate to={`/auth/sign-in?callback=${pathname}`} />

  return (
    <>
      <Header />
      {user &&
        <>
          {user.type === 'teacher' && <TeacherProfile />}
          {user.type === 'student' && <StudentProfile />}
        </>
      }
    </>
  )
}