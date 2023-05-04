import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Header from "../../components/Header/Header";
import StudentList from "../../components/StudentList/StudentList";
import styles from './studentListPage.module.css';

export default function StudentListPage() {

  const { user, doneGettingUser } = useUserContext();
  const { pathname } = useLocation();

  if (!user && doneGettingUser) {
    return <Navigate to={`/auth/sign-in?callback=${pathname}`} />
  }

  return (
    <>
      <Header />
      <h1 className={styles.title}>Your Students</h1>
      <StudentList />
    </>
  )
}