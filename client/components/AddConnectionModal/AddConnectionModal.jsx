import { useState } from "react"
import { Button, Modal } from "react-bootstrap";

export default function AddConnectionModal({ firstName, lastName, id }) {
  const [studentWantsToConnect, setStudentWantsToConnect] = useState(false);

  const handleShow = () => setStudentWantsToConnect(true);
  const handleClose = () => setStudentWantsToConnect(false);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add as Instructor
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add {firstName} {lastName} as an instructor</Modal.Title>
        </Modal.Header>
        <Modal.Body>Requests must be approved by the instructor. If you haven&apos;t reached out to {firstName} yet, please do so before sending your request so you know you will be a good fit.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Send Request
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}