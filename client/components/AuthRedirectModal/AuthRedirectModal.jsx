import { Button, Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import styles from './authRedirectModal.module.css';
import globalStyles from '../../global.module.css';

export default function AuthRedirectModal({ userNeedsToSignIn, setUserNeedsToSignIn }) {

  const { pathname } = useLocation();
  const handleClose = () => setUserNeedsToSignIn(false);

  return (
    <>
      <Modal className={styles.modal} show={userNeedsToSignIn} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <p className={styles.message}>Please sign in to continue.</p>
        </Modal.Body>
        <Modal.Footer>
          <div className={styles.buttonContainer}>
            <Button className={globalStyles.cancelButton} onClick={handleClose}>
              Cancel
            </Button>
            <Link to={`/auth/sign-in?callback=${pathname}`}>
              <Button className={styles.button}>
                Sign In
              </Button>
            </Link>
            <Link to={`/auth/sign-up/student?callback=${pathname}`}>
              <Button className={styles.button}>
                Sign Up
              </Button>
            </Link>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}