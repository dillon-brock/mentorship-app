import TeacherResult from "../TeacherResult/TeacherResult";
import styles from './teacherResults.module.css';
import globalStyles from '../../global.module.css';
import { useState } from "react";
import { TeacherWithSubjects } from "../../types";

type Props = {
  teachers: TeacherWithSubjects[];
  loading: boolean;
  errorMessage: string;
}

export default function TeacherResults({ teachers, loading, errorMessage }: Props) {
  
  const [showLoader, setShowLoader] = useState<boolean>(true);

  setTimeout(() => setShowLoader(false), 2000);

  return (
    <>
      {showLoader || loading ?
        <div className={styles.topLevel}>
          <div className={styles.loaderContainer}>
            <div className={globalStyles.loader}></div>
          </div>
        </div>
        :
        <>
          {teachers.length > 0 && !errorMessage ?
            <div className={styles.container}>
              <div className={styles.list}>
                {teachers.map(teacher => (
                  <TeacherResult key={teacher.id} {...teacher} />
                ))}
              </div>
            </div>
            :
            <div>
              {errorMessage ?
                <h4 className={styles.noResultsMessage}>{errorMessage}</h4>
                :
                <h4 className={styles.noResultsMessage}>No teachers were found matching your criteria. Please try searching for a different subject or expand your radius.</h4>
              }
            </div>
          }
        </>
      }
    </>
  )
}