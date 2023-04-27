import { Button, Modal } from "react-bootstrap";
import styles from './newStudentAccountModal.module.css';
import { Dispatch, SetStateAction } from "react";

type Props = {
  newStudentAccount: boolean;
  setNewStudentAccount: Dispatch<SetStateAction<boolean>>;
}

export default function NewStudentAccountModal({ newStudentAccount, setNewStudentAccount }: Props) {

  const handleClose = () => {
    setNewStudentAccount(false);
  }

  return (
    <Modal className={styles.modal} show={newStudentAccount} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className={styles.title}>Student Account Successfully Created</Modal.Title>
      </Modal.Header>
      <Modal.Body className={styles.message}>
        You can now connect with instructors with whom you want to study, and view teaching materials and leave reviews for your current instructors.
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.buttonContainer}>
          <Button className={styles.button} onClick={handleClose}>Continue</Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}