import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useTeacher } from "../../hooks/useTeacher";
import { checkForReviewMatch } from "../../utils";
import AddConnectionModal from "../AddConnectionModal/AddConnectionModal";
import AddReviewModal from "../AddReviewModal/AddReviewModal";
import AuthRedirectModal from "../AuthRedirectModal/AuthRedirectModal";
import ChatWindow from "../ChatWindow/ChatWindow";
import Header from "../Header/Header";
import ReviewListModal from "../ReviewListModal/ReviewListModal";
import StarRating from "../StarRating/StarRating";
import SubjectList from "../SubjectList/SubjectList";

export default function TeacherDetailPage() {
  
  const { user } = useUserContext();
  const { id } = useParams();
  const { teacher, connection, setConnection, reviews, setReviews, avgRating, setAvgRating } = useTeacher(id);
  const [openChatWindow, setOpenChatWindow] = useState(false);
  const [userNeedsToSignIn, setUserNeedsToSignIn] = useState(false);
  let alreadyReviewed = false;
  if (user && user.studentId) {
    alreadyReviewed = checkForReviewMatch(user.studentId, id, reviews);
  }

  let formattedSubjectList;
  if (teacher.subjects) {
    formattedSubjectList = teacher.subjects
      .reduce((a, b) => {
        a.push(b.subject);
        return a;
      }, [])
      .join(' | ')
  }

  const handleUserWantsToSendMessage = () => {
    if (!user) {
      setUserNeedsToSignIn(true);
      return;
    }
    setOpenChatWindow(true);
  }

  const handleCloseChatWindow = () => {
    setOpenChatWindow(false);
  }

  return (
    <>
      <Header />
      <Image fluid roundedCircle src={teacher.imageUrl} style={{width: '300px', height: '300px' }}/>
      <p>{teacher.firstName} {teacher.lastName}</p>
      <p>{formattedSubjectList}</p>
      {teacher.city && teacher.state ? 
        <p>{teacher.city}, {teacher.state}</p>
        :
        <p>{teacher.zipCode}</p>
      }
      <p><strong>Phone: </strong>{teacher.phoneNumber}  |  <strong>Email: </strong>{teacher.contactEmail}</p>
      {reviews.length > 0 ?
        <>
          <StarRating value={avgRating} editable={false} half={true}/>
          <ReviewListModal reviews={reviews} />
        </>
        :
        <p><em>No reviews yet</em></p>
      }
      <Button onClick={handleUserWantsToSendMessage}>Message</Button>
      <AuthRedirectModal teacherId={id} userNeedsToSignIn={userNeedsToSignIn} setUserNeedsToSignIn={setUserNeedsToSignIn} />
      {!connection && <AddConnectionModal {...teacher} connection={connection} setConnection={setConnection} setUserNeedsToSignIn={setUserNeedsToSignIn} />}
      {connection && connection.connectionApproved === 'approved' && !alreadyReviewed && <AddReviewModal {...teacher} setReviews={setReviews} reviews={reviews} setAvgRating={setAvgRating} />}
      <p>{teacher.bio}</p>
      {teacher.subjects &&
        <SubjectList displayOnly={true} subjects={teacher.subjects} />
      }
      {openChatWindow &&
        <ChatWindow primaryUser={user} secondaryUser={teacher} handleClose={handleCloseChatWindow} />
      }
    </>
  )
}