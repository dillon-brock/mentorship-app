import { Modal } from "react-bootstrap";

export default function RemoveTeacherModal({ handleRemoveTeacher, userWantsToRemoveTeacher, setUserWantsToRemoveTeacher, firstName }) {

  const handleClose = () => setUserWantsToRemoveTeacher(false);

  return (
    <Modal show={userWantsToRemoveTeacher} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure you want to disconnect from {firstName}?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You will no longer have access to {firstName}&apos;s teaching materials. If you change your mind, you can add {firstName} as an instructor again, but the request will need to be re-approved.
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleRemoveTeacher}>Disconnect</Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}