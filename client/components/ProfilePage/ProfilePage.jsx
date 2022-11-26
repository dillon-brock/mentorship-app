import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext"
import Header from "../Header/Header"
import StudentProfile from "../StudentProfile/StudentProfile";
import TeacherProfile from "../TeacherProfile/TeacherProfile";

export default function ProfilePage() {
  const { user } = useUserContext();
  const { pathname } = useLocation();
  if (!user) return <Navigate to={`/auth/sign-in?callback=${pathname}`} />

  return (
    <>
      <Header />
      {user.type === 'teacher' && <TeacherProfile />}
      {user.type === 'student' && <StudentProfile />}
    </>
  )
}