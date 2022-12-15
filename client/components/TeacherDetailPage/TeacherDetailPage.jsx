import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useTeacher } from "../../hooks/useTeacher";
import { deleteConnection } from "../../services/connection";
import { checkForReviewMatch } from "../../utils";
import AddConnectionModal from "../AddConnectionModal/AddConnectionModal";
import AddReviewModal from "../AddReviewModal/AddReviewModal";
import AuthRedirectModal from "../AuthRedirectModal/AuthRedirectModal";
import ChatWindow from "../ChatWindow/ChatWindow";
import Header from "../Header/Header";
import RemoveTeacherModal from "../RemoveTeacherModal/RemoveTeacherModal";
import ReviewListModal from "../ReviewListModal/ReviewListModal";
import StarRating from "../StarRating/StarRating";
import SubjectList from "../SubjectList/SubjectList";
import styles from './teacherDetailPage.module.css';

export default function TeacherDetailPage() {
  
  const { user } = useUserContext();
  const { id } = useParams();
  const { teacher, connection, setConnection, reviews, setReviews, avgRating, setAvgRating } = useTeacher(id);
  const [openChatWindow, setOpenChatWindow] = useState(false);
  const [userNeedsToSignIn, setUserNeedsToSignIn] = useState(false);
  const [userWantsToRemoveTeacher, setUserWantsToRemoveTeacher] = useState(false);
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

  const handleRemoveTeacher = async () => {
    await deleteConnection({ 
      id: connection.id, 
      subjectId: connection.subjectId, 
      studentId: user.studentId
    });
    setConnection(null);
    setUserWantsToRemoveTeacher(false);
  }

  return (
    <>
      <Header />
      <div className={styles.pageContainer}>
        <div className={styles.infoContainer}>
          <Image fluid roundedCircle src={teacher.imageUrl} style={{width: '300px', height: '300px' }}/>
          <div>
            <h1 className={styles.name}>{teacher.firstName} {teacher.lastName}</h1>
            <h4>{formattedSubjectList}</h4>
            {teacher.city && teacher.state ? 
              <p>{teacher.city}, {teacher.state}</p>
              :
              <p>{teacher.zipCode}</p>
            }
            <p><strong>Phone: </strong>{teacher.phoneNumber}  |  <strong>Email: </strong>{teacher.contactEmail}</p>
            {reviews.length > 0 ?
              <div className={styles.reviewsContainer}>
                <StarRating value={avgRating} editable={false} half={true}/>
                <ReviewListModal 
                  reviews={reviews} 
                  firstName={teacher.firstName} 
                  lastName={teacher.lastName} 
                />
              </div>
              :
              <p><em>No reviews yet</em></p>
            }
            <div className={styles.buttonContainer}>
              <Button className={styles.button} onClick={handleUserWantsToSendMessage}>Message</Button>
              {!connection && !(user && user.type === 'teacher') && 
                <AddConnectionModal 
                  {...teacher} 
                  connection={connection} 
                  setConnection={setConnection} 
                  setUserNeedsToSignIn={setUserNeedsToSignIn} 
                />
              }
              {connection && connection.connectionApproved === 'approved' && !alreadyReviewed && 
                <AddReviewModal 
                  {...teacher}
                  setReviews={setReviews} 
                  reviews={reviews} 
                  setAvgRating={setAvgRating}
                />
              }
              {connection && connection.connectionApproved === 'approved' &&
                <RemoveTeacherModal
                  userWantsToRemoveTeacher={userWantsToRemoveTeacher}
                  setUserWantsToRemoveTeacher={setUserWantsToRemoveTeacher}
                  firstName={teacher.firstName}
                  handleRemoveTeacher={handleRemoveTeacher}
                />
              }
            </div>
          </div>
        </div>
        <AuthRedirectModal 
          teacherId={id} 
          userNeedsToSignIn={userNeedsToSignIn} 
          setUserNeedsToSignIn={setUserNeedsToSignIn} 
        />
        <div className={styles.detailsContainer}>
          <div>
            <h3>Bio</h3>
            <p>{teacher.bio}</p>
          </div>
          <div>
            {teacher.subjects &&
              <SubjectList displayOnly={true} subjects={teacher.subjects} />
            }
          </div>
          {openChatWindow &&
            <ChatWindow 
              primaryUser={user} 
              secondaryUser={teacher} 
              handleClose={handleCloseChatWindow} 
            />
          }
        </div>
      </div>
    </>
  )
}