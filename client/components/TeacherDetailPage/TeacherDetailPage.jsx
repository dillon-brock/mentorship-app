import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useTeacher } from "../../hooks/useTeacher";
import AddConnectionModal from "../AddConnectionModal/AddConnectionModal";
import AddReviewModal from "../AddReviewModal/AddReviewModal";
import ChatWindow from "../ChatWindow/ChatWindow";
import Header from "../Header/Header";
import ReviewListModal from "../ReviewListModal/ReviewListModal";
import StarRating from "../StarRating/StarRating";

export default function TeacherDetailPage() {
  const { user } = useUserContext();
  const { id } = useParams();
  const { teacher, setTeacher, connection, setConnection, reviews, setReviews } = useTeacher(id);
  const [openChatWindow, setOpenChatWindow] = useState(false);

  if (!user) return <Navigate to='/auth/sign-in' />
  console.log(teacher);
  return (
    <>
      <Header />
      <Image fluid roundedCircle src={teacher.imageUrl} style={{width: '300px', height: '300px' }}/>
      <p>{teacher.firstName} {teacher.lastName}</p>
      <p>{teacher.subject}  |  {teacher.zipCode}</p>
      <p><strong>Phone: </strong>{teacher.phoneNumber}  |  <strong>Email: </strong>{teacher.contactEmail}</p>
      {reviews.length > 0 ?
        <>
          <StarRating value={Number(teacher.avgRating)} editable={false} />
          <ReviewListModal reviews={reviews} />
        </>
        :
        <p><em>No reviews yet</em></p>
      }
      <Button onClick={() => setOpenChatWindow(true)}>Message</Button>
      {!connection && <AddConnectionModal {...teacher} connection={connection} setConnection={setConnection} />}
      {connection && connection.connectionApproved === 'approved' && <AddReviewModal {...teacher} setReviews={setReviews} teacher={teacher} setTeacher={setTeacher} reviews={reviews} />}
      <p>{teacher.bio}</p>
      {openChatWindow &&
        <ChatWindow primaryUser={user} secondaryUser={teacher} />
      }
    </>
  )
}