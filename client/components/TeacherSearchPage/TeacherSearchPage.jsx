import { useState } from "react";
import { Container } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Header from "../Header/Header";
import TeacherResults from "../TeacherResults/TeacherResults";
import TeacherSearchForm from "../TeaherSearchForm/TeacherSearchForm";

export default function TeacherSearchPage() {

  const { user } = useUserContext();
  const [subject, setSubject] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState(0);

  if (!user) {
    return <Navigate to='/auth/sign-in' />
  }
  
  return (
    <>
      <Header />
      <Container className="d-flex align-items-start justify-content-center">
        <TeacherSearchForm
          setSubject={setSubject}
          setZipCode={setZipCode}
          setRadius={setRadius}
        />
        <TeacherResults subject={subject} zipCode={zipCode} radius={radius} />
      </Container>
    </>
  )
}