import { Button, Modal } from "react-bootstrap";
import styles from './removeTeacherModal.module.css';
import globalStyles from '../../global.module.css';
import { Dispatch, SetStateAction } from "react";

type Props = {
  handleRemoveTeacher: () => Promise<void>;
  userWantsToRemoveTeacher: boolean;
  setUserWantsToRemoveTeacher: Dispatch<SetStateAction<boolean>>;
  firstName: string;
}

export default function RemoveTeacherModal({ 
  handleRemoveTeacher, userWantsToRemoveTeacher, 
  setUserWantsToRemoveTeacher, firstName }: Props) {

  const handleClose = () => setUserWantsToRemoveTeacher(false);

  return (
    <>
      <Button className={styles.openButton} onClick={() => setUserWantsToRemoveTeacher(true)}>Disconnect</Button>
      <Modal className={styles.modal} show={userWantsToRemoveTeacher} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.title}>Are you sure you want to disconnect from {firstName}?</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>
          You will no longer have access to {firstName}&apos;s teaching materials. If you change your mind, you can add {firstName} as an instructor again, but the request will need to be re-approved.
        </Modal.Body>
        <Modal.Footer>
          <div className={styles.buttonContainer}>
            <Button className={globalStyles.cancelButton} onClick={handleClose}>Cancel</Button>
            <Button className={styles.removeButton} onClick={handleRemoveTeacher}>Disconnect</Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}