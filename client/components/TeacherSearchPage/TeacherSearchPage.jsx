import { useState } from "react";
import { Container } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { useAllTeachers } from "../../hooks/useAllTeachers";
import Header from "../Header/Header";
import TeacherResults from "../TeacherResults/TeacherResults";
import TeacherSearchForm from "../TeaherSearchForm/TeacherSearchForm";

export default function TeacherSearchPage() {

  const { user, doneGettingUser } = useUserContext();
  const [subject, setSubject] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState(0);
  const [initialSliceDone, setInitialSliceDone] = useState(false);
  const [pageLength, setPageLength] = useState(10);
  const [page, setPage] = useState(1);
  const { teachers, setTeachers, totalPages } = useAllTeachers(subject, zipCode, radius, pageLength);

  if (!initialSliceDone) {
    setTeachers(prev => prev.slice((page - 1) * pageLength, page * pageLength + 1));
    setInitialSliceDone(true);
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
        <TeacherResults teachers={teachers} />
      </Container>
    </>
  )
}