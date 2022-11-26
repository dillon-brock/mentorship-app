import { Button, Modal } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function AuthRedirectModal({ teacherId, userNeedsToSignIn, setUserNeedsToSignIn }) {

  const { pathname } = useLocation();
  const handleClose = () => setUserNeedsToSignIn(false);

  return (
    <>
      <Modal show={userNeedsToSignIn} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>Please sign in to continue</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Link to={`/auth/sign-in?callback=${pathname}`}>
            <Button variant="primary">
              Sign In
            </Button>
          </Link>
          <Link to={`/auth/sign-up/student?callback=${pathname}`}>
            <Button variant="primary">
              Sign Up
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}