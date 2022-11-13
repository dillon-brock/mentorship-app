import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Header from "../Header/Header";
import StudentList from "../StudentList/StudentList";

export default function StudentListPage() {

  const { user, setUser } = useUserContext();

  if (!user) {
    return <Navigate to='/auth/sign-in' />
  }

  return (
    <>
      <Header />
      <StudentList />
    </>
  )
}