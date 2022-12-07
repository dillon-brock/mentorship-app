import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { postReview } from "../../services/reviews";
import { getAverageRating } from "../../utils";
import StarRating from "../StarRating/StarRating";
import styles from './addReviewModal.module.css';

export default function AddReviewModal({ id, firstName, lastName, reviews, setReviews, setAvgRating }) {

  const { user } = useUserContext();
  
  const [studentWantsToAddReview, setStudentWantsToAddReview] = useState(false);
  const [leaveAnonymously, setLeaveAnonymously] = useState(false);
  const [stars, setStars] = useState(0);

  const handleShow = () => setStudentWantsToAddReview(true);
  const handleClose = () => {
    setStars(0);
    setStudentWantsToAddReview(false);
  }

  const ratingChanged = (newRating) => setStars(newRating);

  const handleAddReview = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const detail = formData.get("detail");
    const newReview = await postReview({
      teacherId: id,
      stars,
      detail,
      anonymous: leaveAnonymously
    });
    setReviews(prev => [...prev, newReview]);
    setAvgRating(getAverageRating([...reviews, newReview]));
    setStars(0);
    setLeaveAnonymously(false);
    setStudentWantsToAddReview(false);
  }

  return (
    <>
      <Button className={styles.button} onClick={handleShow}>
        Leave Review
      </Button>
      <Modal className={styles.modal} show={studentWantsToAddReview} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className={styles.title}>Add a review for {firstName} {lastName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StarRating value={stars} editable={true} ratingChanged={ratingChanged} half={false} />
          <Form onSubmit={handleAddReview}>
            <Form.Group className="mb-2" controlId="detail">
              <Form.Control className={styles.input} as="textarea" rows={4} name="detail" placeholder="Share any details about your experience here"/>
            </Form.Group>
            <Form.Check
              onChange={() => setLeaveAnonymously(!leaveAnonymously)}
              type="checkbox"
              label="Leave anonymously"
            />
            <div className={styles.buttonContainer}>
              <Button className={styles.cancelButton} onClick={handleClose}>
                Cancel
              </Button>
              <Button className={styles.reviewButton} type="submit">
                Add Review
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}