import { Button, Modal } from "react-bootstrap";

export default function NewStudentAccountModal({ newStudentAccount, setNewStudentAccount }) {

  const handleClose = () => {
    setNewStudentAccount(false);
  }

  return (
    <Modal show={newStudentAccount} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Student Account Successfully Created</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You can now connect with instructors with whom you want to study, and view teaching materials and leave reviews for your current instructors.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Continue</Button>
      </Modal.Footer>
    </Modal>
  )
}