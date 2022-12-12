import TeacherResult from "../TeacherResult/TeacherResult";
import styles from './teacherResults.module.css';
import globalStyles from '../../global.module.css';
import { useState } from "react";

export default function TeacherResults({ teachers, loading }) {
  
  const [showLoader, setShowLoader] = useState(true);

  setTimeout(() => setShowLoader(false), 2000);

  if (!teachers.length)
    return <p>No teachers were found matching your criteria. Please try searching for a different subject or expand your radius.</p>

  return (
    <>
      {showLoader || loading ?
        <div className={styles.topLevel}>
          <div className={styles.loaderContainer}>
            <div className={globalStyles.loader} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></div>
          </div>
        </div>
        :
        <div className={styles.container}>
          <div className={styles.list}>
            {teachers.map(teacher => <TeacherResult key={teacher.id} {...teacher} />)}
          </div>
        </div>
      }
    </>
  )
}