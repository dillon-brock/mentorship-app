import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { Button, Modal, Form } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import useSubjects from "../../hooks/useSubjects";
import { createConnection } from "../../services/connection/connection";
import { addStudentSubject } from "../../services/student/student";
import styles from './addConnectionModal.module.css';
import globalStyles from '../../global.module.css';
import { ConnectionData } from "../../types";
import SubjectSelect from "../SubjectSelect/SubjectSelect";

type Props = {
  id: string;
  firstName: string;
  lastName: string;
  setConnection: Dispatch<SetStateAction<ConnectionData | null>>;
  setUserNeedsToSignIn: (newVal: boolean) => void;
}

export default function AddConnectionModal({id, firstName, lastName, setConnection, setUserNeedsToSignIn }: Props) {
  const [studentWantsToConnect, setStudentWantsToConnect] = useState<boolean>(false);
  const { subjects } = useSubjects(id);
  const [subjectId, setSubjectId] = useState<string>('');
  const { user } = useUserContext();
  const [subjectError, setSubjectError] = useState<string>('');

  const handleShow = () => {
    if (!user) {
      setUserNeedsToSignIn(true);
      return;
    }
    setStudentWantsToConnect(true)
  };
  const handleClose = () => setStudentWantsToConnect(false);

  const handleChangeSubject = (e: ChangeEvent<HTMLSelectElement>) => {
    if (subjectError) setSubjectError('');
    setSubjectId(e.target.value);
  }

  const handleSendRequest = async () => {
    if (!subjectId) {
      setSubjectError('Subject is required.');
      return;
    }
    if (user && user.type == 'student') {
      const newConnection = await createConnection(id, user.studentId as string);
      await addStudentSubject(subjectId);
      setConnection(newConnection);
      setStudentWantsToConnect(false);
    }
  }


  return (
    <>
      <Button className={styles.button} onClick={handleShow}>
        + Add as Instructor
      </Button>
      <Modal className={styles.modal} show={studentWantsToConnect} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.title}>
            Add {firstName} {lastName} as an instructor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className={styles.message}>Requests must be approved by the instructor. If you haven&apos;t reached out to {firstName} yet, please do so before sending your request so you know you will be a good fit.</p>
          <hr />
          <p>Please select the subject you&apos;re interested in learning:</p>
          <SubjectSelect 
            handleChangeSubject={handleChangeSubject}
            subjects={subjects}
            error={subjectError}
            className={styles.select} />
        </Modal.Body>
        <Modal.Footer>
          <Button className={globalStyles.cancelButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={styles.sendButton} onClick={handleSendRequest}>
            Send Request
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}