import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { postReview } from "../../services/reviews";
import { getAverageRating } from "../../utils";
import StarRating from "../StarRating/StarRating";

export default function AddReviewModal({ id, firstName, lastName, reviews, setReviews, teacher, setTeacher }) {

  const { user } = useUserContext();
  
  const [studentWantsToAddReview, setStudentWantsToAddReview] = useState(false);

  const handleShow = () => setStudentWantsToAddReview(true);
  const handleClose = () => setStudentWantsToAddReview(false);

  const ratingChanged = (newRating) => setStars(newRating);

  const handleAddReview = async (e) => {
    e.preventDefault();
    console.log('submitting review!');
    const formData = new FormData(e.target);
    const detail = formData.get("detail");
    const newReview = await postReview({ teacherId: id, studentId: user.studentId, stars, detail });
    setReviews(prev => [...prev, newReview]);
    console.log([...reviews, newReview]);
    setTeacher({...teacher, avgRating: getAverageRating([...reviews, newReview ])})
    setStudentWantsToAddReview(false);
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
          <StarRating value={stars} editable={true} ratingChanged={ratingChanged} />
          <Form onSubmit={handleAddReview}>
            <Form.Group className="mb-2" controlId="detail">
              <Form.Label></Form.Label>
              <Form.Control as="textarea" rows={4} name="detail" placeholder="Share any details about your experience here"/>
            </Form.Group>
            <Button type="submit" variant="primary">
              Add Review
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}