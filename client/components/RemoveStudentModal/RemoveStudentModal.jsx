import { Button, Modal } from "react-bootstrap";
import { deleteConnection } from "../../services/connection";

export default function RemoveStudentModal({
  id,
  firstName, 
  connectionId, 
  setApprovedStudents, 
  userWantsToRemoveStudent, 
  setUserWantsToRemoveStudent 
}) {

  const handleClose = () => setUserWantsToRemoveStudent(false);

  const handleDisconnect = async () => {
    await deleteConnection(connectionId);
    setApprovedStudents(prev => prev.filter(student => student.id !== id))
  }

  return (
    <Modal show={userWantsToRemoveStudent} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to disconnect from {firstName}?</Modal.Title>
      </Modal.Header>
        <Modal.Body>{firstName} will still see your profile when searching for instructors, but they will no longer be able to leave you reviews or have access to your learning materials.</Modal.Body>
        <Modal.Footer>
          <div>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDisconnect}>Disconnect</Button>
          </div>
        </Modal.Footer>
    </Modal>
  )
}