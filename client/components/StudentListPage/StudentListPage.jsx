import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Header from "../Header/Header";
import StudentList from "../StudentList/StudentList";

export default function StudentListPage() {

  const { user, doneGettingUser } = useUserContext();
  if (doneGettingUser) console.log(user);
  if (!user && doneGettingUser) {
    return <Navigate to='/auth/sign-in' />
  }

  return (
    <>
      <Header />
      <StudentList />
    </>
  )
}