import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Header from "../Header/Header";
import StudentList from "../StudentList/StudentList";

export default function StudentListPage() {

  const { user, doneGettingUser } = useUserContext();
  const { pathname } = useLocation();

  if (!user && doneGettingUser) {
    return <Navigate to={`/auth/sign-in?callback=${pathname}`} />
  }

  return (
    <>
      <Header />
      <h1>Your Students</h1>
      <StudentList />
    </>
  )
}