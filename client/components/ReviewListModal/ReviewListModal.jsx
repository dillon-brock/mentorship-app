import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Review from "../Review/Review";

export default function ReviewListModal({ reviews }) {

  const [showReviews, setShowReviews] = useState(false);
  const handleShow = () => setShowReviews(true);
  const handleClose = () => setShowReviews(false);

  return (
    <>
    <Button variant="link" onClick={handleShow}>
        {reviews.length} {reviews.length > 1 ? 'reviews' : 'review'}
      </Button>
      <Modal show={showReviews} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          {reviews.map(review => <Review key={review.id} {...review} />)}
        </Modal.Body>
      </Modal>
    </>
  )
}