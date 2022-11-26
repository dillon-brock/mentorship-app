import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useTeacher } from "../../hooks/useTeacher";
import AddConnectionModal from "../AddConnectionModal/AddConnectionModal";
import AddReviewModal from "../AddReviewModal/AddReviewModal";
import AuthRedirectModal from "../AuthRedirectModal/AuthRedirectModal";
import ChatWindow from "../ChatWindow/ChatWindow";
import Header from "../Header/Header";
import ReviewListModal from "../ReviewListModal/ReviewListModal";
import StarRating from "../StarRating/StarRating";

export default function TeacherDetailPage() {
  
  const { user } = useUserContext();
  const { id } = useParams();
  const { teacher, setTeacher, connection, setConnection, reviews, setReviews } = useTeacher(id);
  const [openChatWindow, setOpenChatWindow] = useState(false);
  const [userNeedsToSignIn, setUserNeedsToSignIn] = useState(false);

  const handleUserWantsToSendMessage = () => {
    if (!user) {
      setUserNeedsToSignIn(true);
      return;
    }
    setOpenChatWindow(true);
  }
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
      <Button onClick={handleUserWantsToSendMessage}>Message</Button>
      <AuthRedirectModal teacherId={id} userNeedsToSignIn={userNeedsToSignIn} setUserNeedsToSignIn={setUserNeedsToSignIn} />
      {!connection && <AddConnectionModal {...teacher} connection={connection} setConnection={setConnection} setUserNeedsToSignIn={setUserNeedsToSignIn} />}
      {connection && connection.connectionApproved === 'approved' && <AddReviewModal {...teacher} setReviews={setReviews} teacher={teacher} setTeacher={setTeacher} reviews={reviews} />}
      <p>{teacher.bio}</p>
      {openChatWindow &&
        <ChatWindow primaryUser={user} secondaryUser={teacher} />
      }
    </>
  )
}