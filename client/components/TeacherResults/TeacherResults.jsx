import { Container } from "react-bootstrap";
import TeacherResult from "../TeacherResult/TeacherResult";
import styles from './teacherResults.module.css';

export default function TeacherResults({ teachers }) {
  
  if (!teachers.length)
    return <p>No teachers were found matching your criteria. Please try searching for a different subject or expand your radius.</p>

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {teachers.map(teacher => <TeacherResult key={teacher.id} {...teacher} />)}
      </div>
    </div>
  )
}