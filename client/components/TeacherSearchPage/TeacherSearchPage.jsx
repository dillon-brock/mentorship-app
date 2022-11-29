import { useState } from "react";
import { Container } from "react-bootstrap";
import { useAllTeachers } from "../../hooks/useAllTeachers";
import Header from "../Header/Header";
import PagingForm from "../PagingForm/PagingForm";
import TeacherResults from "../TeacherResults/TeacherResults";
import TeacherSearchForm from "../TeaherSearchForm/TeacherSearchForm";

export default function TeacherSearchPage() {

  const [subject, setSubject] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState(0);
  const [lessonType, setLessonType] = useState('Any');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [pageLength, setPageLength] = useState(10);
  const [page, setPage] = useState(1);
  const { teachers, totalPages, errorMessage, setErrorMessage } = useAllTeachers(subject, zipCode, lessonType, minPrice, maxPrice, radius, page, pageLength);


  
  return (
    <>
      <Header />
      <Container className="d-flex align-items-start justify-content-center">
        <Container className="d-flex flex-column align-items-center">
          <TeacherSearchForm
            setSubject={setSubject}
            setZipCode={setZipCode}
            setRadius={setRadius}
            setLessonType={setLessonType}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
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