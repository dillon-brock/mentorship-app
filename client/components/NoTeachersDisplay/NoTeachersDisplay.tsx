import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './noTeachersDisplay.module.css';

export default function NoTeachersDisplay() {

  return (
    <div>
      <h3 className={styles.emptySubtitle}>You currently are not connected with any instructors.</h3>
      <div className={styles.searchButtonContainer}>
        <Link to="/find-teachers">
          <Button className={styles.searchButton}>Find an Instructor</Button>
        </Link>
      </div>
    </div>
  )
}