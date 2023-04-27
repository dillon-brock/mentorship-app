import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ReviewDisplay from "../ReviewDisplay/ReviewDisplay";
import styles from './reviewListModal.module.css';



export default function ReviewListModal({ reviews, firstName, lastName }) {

  const [showReviews, setShowReviews] = useState(false);
  const handleShow = () => setShowReviews(true);
  const handleClose = () => setShowReviews(false);

  return (
    <>
    <Button variant="link" onClick={handleShow}>
        {reviews.length} {reviews.length > 1 ? 'reviews' : 'review'}
      </Button>
      <Modal className={styles.modal} show={showReviews} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.title}>Reviews for {firstName} {lastName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {reviews.map(review => <ReviewDisplay key={review.id} {...review} />)}
        </Modal.Body>
      </Modal>
    </>
  )
}