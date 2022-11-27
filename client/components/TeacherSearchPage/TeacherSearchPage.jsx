import { useState } from "react";
import { Container } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { useAllTeachers } from "../../hooks/useAllTeachers";
import Header from "../Header/Header";
import PagingForm from "../PagingForm/PagingForm";
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
  const { teachers, setTeachers, totalPages } = useAllTeachers(subject, zipCode, radius, page, pageLength);

  if (doneGettingUser) console.log(user);

  
  return (
    <>
      <Header />
      <Container className="d-flex align-items-start justify-content-center">
        <Container className="d-flex flex-column align-items-center">
          <TeacherSearchForm
            setSubject={setSubject}
            setZipCode={setZipCode}
            setRadius={setRadius}
          />
          <PagingForm 
            setPageLength={setPageLength}
            page={page}
            setPage={setPage}
            totalPages={totalPages} />
        </Container>
        <TeacherResults teachers={teachers} />
      </Container>
    </>
  )
}