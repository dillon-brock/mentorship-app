import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './teacherResult.module.css';

export default function TeacherResult({ id, firstName, lastName, zipCode, subjects, imageUrl, city, state }) {
  
  const subjectList = subjects
    .reduce((a, b) => {
      a.push(b.subject);
      return a;
    }, [])
    .join(' | ');

  return (
    <Link to={`/teacher/${id}`} style={{ textDecoration: 'none' }}>
      <div className={styles.result}>
        <div>
          <Image className={styles.image} src={imageUrl} />
        </div>
        <div>
          <p className={styles.name}>{firstName} {lastName}</p>
          <p>{subjectList}</p>
          {city && state ?
            <p>{city}, {state}</p>
            :
            <p>{zipCode}</p>
          }
        </div>
      </div>
    </Link>
  )
}