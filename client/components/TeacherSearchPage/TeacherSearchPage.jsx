import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Header from "../Header/Header";

export default function TeacherSearchPage() {

  const { user, setUser } = useUserContext();
  
  if (!user) {
    return <Navigate to='/auth/sign-in' />
  }
  
  return (
    <>
      <Header />
    </>
  )
}