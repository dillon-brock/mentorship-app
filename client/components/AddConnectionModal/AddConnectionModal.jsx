import { useState } from "react"
import { Button, Modal } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext.js";
import { createConnection } from "../../services/connection.js";

export default function AddConnectionModal({id, firstName, lastName, setConnection }) {
  const [studentWantsToConnect, setStudentWantsToConnect] = useState(false);
  const { user } = useUserContext();
  console.log(user.studentId);

  const handleShow = () => setStudentWantsToConnect(true);
  const handleClose = () => setStudentWantsToConnect(false);
  const handleSendRequest = async () => {
    const newConnection = await createConnection(id, user.studentId);
    setConnection(newConnection);
    setStudentWantsToConnect(false);
  }

  console.log(studentWantsToConnect);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add as Instructor
      </Button>
      <Modal show={studentWantsToConnect} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add {firstName} {lastName} as an instructor</Modal.Title>
        </Modal.Header>
        <Modal.Body>Requests must be approved by the instructor. If you haven&apos;t reached out to {firstName} yet, please do so before sending your request so you know you will be a good fit.</Modal.Body>
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