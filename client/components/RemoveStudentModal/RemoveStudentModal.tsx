import { Button, Modal } from "react-bootstrap";
import { deleteConnection } from "../../services/connection";
import globalStyles from '../../global.module.css';
import styles from './removeStudentModal.module.css';
import { CurrentStudent } from "../../types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  id: string;
  firstName: string;
  connectionId: string;
  subjectId: string;
  setApprovedStudents: Dispatch<SetStateAction<CurrentStudent[]>>;
  userWantsToRemoveStudent: boolean;
  setUserWantsToRemoveStudent: Dispatch<SetStateAction<boolean>>;
}

export default function RemoveStudentModal({
  id,
  firstName, 
  connectionId,
  subjectId,
  setApprovedStudents, 
  userWantsToRemoveStudent, 
  setUserWantsToRemoveStudent 
}: Props) {

  const handleClose = () => setUserWantsToRemoveStudent(false);

  const handleDisconnect = async () => {
    await deleteConnection({ id: connectionId, subjectId, studentId: id });
    setApprovedStudents(prev => prev.filter(student => student.id !== id))
  }

  return (
    <Modal className={styles.modal} show={userWantsToRemoveStudent} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className={styles.title}>Are you sure you want to remove {firstName} from your students?</Modal.Title>
      </Modal.Header>
        <Modal.Body className={styles.body}>
          {firstName} will still see your profile when searching for instructors, but they will no longer be able to leave you reviews or have access to your teaching materials.
        </Modal.Body>
        <Modal.Footer>
          <div className={styles.buttonContainer}>
            <Button className={globalStyles.cancelButton} onClick={handleClose}>Cancel</Button>
            <Button className={styles.removeButton} onClick={handleDisconnect}>Remove</Button>
          </div>
        </Modal.Footer>
    </Modal>
  )
}