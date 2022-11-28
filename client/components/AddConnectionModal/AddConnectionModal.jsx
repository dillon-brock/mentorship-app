import { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext.js";
import useSubjects from "../../hooks/useSubjects.js";
import { createConnection } from "../../services/connection.js";
import { addStudentSubject } from "../../services/student.js";

export default function AddConnectionModal({id, firstName, lastName, setConnection, setUserNeedsToSignIn }) {
  const [studentWantsToConnect, setStudentWantsToConnect] = useState(false);
  const { subjects } = useSubjects(id);
  const [subjectId, setSubjectId] = useState('');
  const { user } = useUserContext();

  const handleShow = () => {
    if (!user) {
      setUserNeedsToSignIn(true);
      return;
    }
    setStudentWantsToConnect(true)
  };
  const handleClose = () => setStudentWantsToConnect(false);

  const handleChangeSubject = (e) => {
    setSubjectId(e.target.value);
  }

  const handleSendRequest = async () => {
    const newConnection = await createConnection(id, user.studentId);
    await addStudentSubject(subjectId);
    setConnection(newConnection);
    setStudentWantsToConnect(false);
  }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add as Instructor
      </Button>
      <Modal show={studentWantsToConnect} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add {firstName} {lastName} as an instructor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Requests must be approved by the instructor. If you haven&apos;t reached out to {firstName} yet, please do so before sending your request so you know you will be a good fit.</p>
          <hr />
          <p>Please select the subject you&apos;re interested in learning:</p>
          <Form.Select onChange={handleChangeSubject}>
            <option value=''></option>
            {subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.subject}</option>)}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSendRequest}>
            Send Request
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}