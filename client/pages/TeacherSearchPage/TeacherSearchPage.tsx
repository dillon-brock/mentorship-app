import { FormEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAllTeachers } from "../../hooks/useAllTeachers";
import Header from "../../components/Header/Header";
import NewStudentAccountModal from "../../components/NewStudentAccountModal/NewStudentAccountModal";
import PagingButtons from "../../components/PagingButtons/PagingButtons";
import PagingSelect from "../../components/PagingSelect/PagingSelect";
import TeacherResults from "../../components/TeacherResults/TeacherResults";
import TeacherSearchForm from "../../components/TeacherSearchForm/TeacherSearchForm";
import styles from './teacherSearchPage.module.css';

export default function TeacherSearchPage() {

  const location = useLocation();
  const newStudentFromLocation: boolean = location.state ? location.state.newStudentAccount : false;
  const [newStudentAccount, setNewStudentAccount] = useState<boolean>(newStudentFromLocation);
  const [subject, setSubject] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [radius, setRadius] = useState<string>('0');
  const [lessonType, setLessonType] = useState<string>('Any');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [pageLength, setPageLength] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const { 
    teachers, 
    totalPages, 
    zipCodeErrorMessage, 
    setZipCodeErrorMessage,
    errorMessage,
    loading 
  } = useAllTeachers(subject, zipCode, lessonType, minPrice, maxPrice, radius, page, pageLength);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    setPage(1);
    setSubject(formData.get('subject') as string);
    setZipCode(formData.get('zipCode') as string);
    setRadius(formData.get('radius') as string);
    if (formData.get('lessonType')) setLessonType(formData.get('lessonType') as string);
    if (formData.get('minPrice')) setMinPrice(formData.get('minPrice') as unknown as number);
    if (formData.get('maxPrice')) setMaxPrice(formData.get('maxPrice') as unknown as number);
  }

  return (
    <>
      <Header />
      <div>
        <h1 className={styles.title}>Find an Instructor</h1>
        <div className={styles.controlsContainer}>
          <TeacherSearchForm
            errorMessage={zipCodeErrorMessage}
            setErrorMessage={setZipCodeErrorMessage}
            handleSubmit={handleSubmit}
          />
          <PagingSelect 
            setPageLength={setPageLength}
          />
        </div>
        <TeacherResults 
          teachers={teachers} 
          loading={loading} 
          errorMessage={errorMessage} 
        />
      </div>
      <PagingButtons
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        loading={loading}
        teachers={teachers}
      />
      <NewStudentAccountModal 
        newStudentAccount={newStudentAccount} 
        setNewStudentAccount={setNewStudentAccount}
      />
    </>
  )
}