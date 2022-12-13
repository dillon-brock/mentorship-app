import { Col, Container, Image, Row } from 'react-bootstrap';
import styles from './startLink.module.css';
import teacherImage from './teacher_link.png';
import studentImage from './student_link.png';
import searchImage from './search_link.png';

export default function StartLink({ type }) {
  let description;
  let imageSrc;
  if (type === 'teach') {
    description = 'Create a public profile, upload teaching materials, and connect with students.'
    imageSrc = teacherImage;
  }
  else if (type === 'learn') {
    description = 'Create a student account to message instructors and view their learning materials.'
    imageSrc = studentImage;
  }
  else {
    description = 'Search for instructors and view their profiles. You will need to create an account to connect with them.'
    imageSrc = searchImage;
  }

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src={imageSrc} style={{ width: '100px', height: '100px' }} />
      </div>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          {type ?
            <p className={styles.title}>I want to {type}</p>
            :
            <p className={styles.title}>Find Instructors</p>
          }
        </div>
        <div className={styles.descriptionContainer}>
          <p>{description}</p>
        </div>
      </div>
      <div className={styles.chevronContainer}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>
    </div>
  );
}