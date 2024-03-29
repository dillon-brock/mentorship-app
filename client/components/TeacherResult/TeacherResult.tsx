import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './teacherResult.module.css';
import { TeacherWithSubjects } from "../../types";


export default function TeacherResult({ id, firstName, lastName, zipCode, subjects, imageUrl, city, state }: TeacherWithSubjects) {
  
  const subjectList = subjects
    .reduce((a: string[], b) => {
      a.push(b.subject);
      return a;
    }, [])
    .join(' | ');

  return (
    <Link to={`/teacher/${id}`} className={styles.link}>
      <div className={styles.result}>
        <div>
          <Image className={styles.image} src={imageUrl} />
        </div>
        <div>
          <p className={styles.name}>{firstName} {lastName}</p>
          <p className={styles.subjects}>{subjectList}</p>
          {city && state ?
            <p className={styles.location}>{city}, {state}</p>
            :
            <p className={styles.location}>{zipCode}</p>
          }
        </div>
      </div>
    </Link>
  )
}