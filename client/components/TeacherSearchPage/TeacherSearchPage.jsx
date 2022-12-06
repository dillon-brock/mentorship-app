import { useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAllTeachers } from "../../hooks/useAllTeachers";
import Header from "../Header/Header";
import NewStudentAccountModal from "../NewStudentAccountModal/NewStudentAccountModal";
import PagingButtons from "../PagingButtons/PagingButtons";
import PagingSelect from "../PagingSelect/PagingSelect";
import TeacherResults from "../TeacherResults/TeacherResults";
import TeacherSearchForm from "../TeacherSearchForm/TeacherSearchForm";
import styles from './TeacherSearchPage.module.css';

export default function TeacherSearchPage() {

  const location = useLocation();
  const newStudentFromLocation = location.state ? location.state.newStudentAccount : false;
  const [newStudentAccount, setNewStudentAccount] = useState(newStudentFromLocation);
  const [subject, setSubject] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState(0);
  const [lessonType, setLessonType] = useState('Any');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [pageLength, setPageLength] = useState(10);
  const [page, setPage] = useState(1);
  const { teachers, totalPages, errorMessage, setErrorMessage } = useAllTeachers(subject, zipCode, lessonType, minPrice, maxPrice, radius, page, pageLength);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setPage(1);
    setSubject(formData.get('subject'));
    setZipCode(formData.get('zipCode'));
    setRadius(formData.get('radius'));
    setLessonType(formData.get('lessonType'));
    if (formData.get('minPrice')) setMinPrice(formData.get('minPrice'));
    if (formData.get('maxPrice')) setMaxPrice(formData.get('maxPrice'));
  }

  return (
    <>
      <Header />
      <div>
        <div className={styles.controlsContainer}>
          <TeacherSearchForm
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            handleSubmit={handleSubmit}
          />
          <PagingSelect 
            setPageLength={setPageLength}
          />
        </div>
        <TeacherResults teachers={teachers} />
        <PagingButtons
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
      <NewStudentAccountModal newStudentAccount={newStudentAccount} setNewStudentAccount={setNewStudentAccount}/>
    </>
  )
}