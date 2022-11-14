import { Button, Modal } from "react-bootstrap";
import StarRating from "../StarRating/StarRating";

export default function AddReviewModal({ id, firstName, lastName }) {
  
  const [studentWantsToAddReview, setStudentWantsToAddReview] = useState(false);
  const [stars, setStars] = useState(0);

  const handleShow = () => setStudentWantsToAddReview(true);
  const handleClose = () => setStudentWantsToAddReview(false);

  const handleAddReview = () => {

  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Leave Review
      </Button>
      <Modal show={studentWantsToAddReview} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a review for {firstName} {lastName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StarRating value={stars} editable={true} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSendRequest}>
            Add Review
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}