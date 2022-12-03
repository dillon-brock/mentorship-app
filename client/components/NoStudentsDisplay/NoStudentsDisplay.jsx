import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './noStudentsDisplay.module.css';

export default function NoStudentsDisplay() {
  return (
    <div>
      <h3 className={styles.title}>You currently have no students or pending requests.</h3>
      <h4 className={styles.subtitle}>While you wait for students to reach out, you can</h4>
      <div className={styles.buttonContainer}>
        <Link to='/teaching-materials'>
          <Button className={styles.button}>Upload Teaching Materials &nbsp;&nbsp;&nbsp;{'>'}</Button>
        </Link>
        <Link to='/find-teachers'>
          <Button className={styles.button}>Connect With Other Instructors &nbsp;&nbsp;&nbsp;{'>'}</Button>
        </Link>
      </div>
    </div>
  )
}