import { Button, Modal } from "react-bootstrap";
import { Navigate } from "react-router-dom";

export default function AuthRedirectModal({ teacherId, userNeedsToSignIn, setUserNeedsToSignIn }) {

  const handleClose = () => setUserNeedsToSignIn(false);
  const handleGoToSignIn = () => {
    return <Navigate to={`/auth/sign-in?callback=/teacher/${teacherId}`} />
  }

  return (
    <>
      <Modal show={userNeedsToSignIn} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>Please sign in to continue</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleGoToSignIn}>
            Go to Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}