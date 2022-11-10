import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Header from "../Header/Header";
import TeacherResults from "../TeacherResults/TeacherResults";

export default function TeacherSearchPage() {

  const { user, setUser } = useUserContext();
  const [subject, setSubject] = useState('');
  
  if (!user) {
    return <Navigate to='/auth/sign-in' />
  }
  
  return (
    <>
      <Header />
      <TeacherResults subject={subject} />
    </>
  )
}