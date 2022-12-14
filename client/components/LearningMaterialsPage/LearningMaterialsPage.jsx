import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import useLearningMaterials from "../../hooks/useLearningMaterials"
import ChatWindow from "../ChatWindow/ChatWindow";
import Header from "../Header/Header";
import LearningMaterialsSection from "../LearningMaterialsSection/LearningMaterialsSection";
import styles from './learningMaterialsPage.module.css';
import globalStyles from '../../global.module.css';
import { Button } from "react-bootstrap";

export default function LearningMaterialsPage() {
  const { teachersWithMaterials, loading } = useLearningMaterials();
  const { user, doneGettingUser } = useUserContext();
  const { pathname } = useLocation();
  const [openChatBox, setOpenChatBox] = useState(false);
  const [teacherRecipient, setTeacherRecipient] = useState(null);

  const handleMessage = (teacher, e) => {
    e.stopPropagation();
    setTeacherRecipient(teacher);
    setOpenChatBox(true);
  }

  const handleCloseChatBox = () => {
    setOpenChatBox(false);
  }

  if (!user && doneGettingUser)
    return <Navigate to={`/auth/sign-in?callback=${pathname}`} />

  return (
    <>
      <Header />
      <h1 className={styles.title}>Your Learning Materials</h1>
      {loading ?
        <div className={styles.loaderContainer}>
          <div className={globalStyles.loader}></div>
        </div>
        :
        <>
          {teachersWithMaterials.length > 0 ?
            <>
              {teachersWithMaterials.map((teacher, i) => (
                <LearningMaterialsSection
                  key={teacher.id}
                  { ...teacher }
                  i={i}
                  setTeacherRecipient={setTeacherRecipient}
                  handleMessage={(e) => handleMessage(teacher, e)}
                />
              ))}
            </>
            :
            <div>
              <h3 className={styles.emptySubtitle}>You currently are not connected with any instructors.</h3>
              <div className={styles.searchButtonContainer}>
                <Link to="/find-teachers">
                  <Button className={styles.searchButton}>Find an Instructor</Button>
                </Link>
              </div>
            </div>
          }
        </>
      }
      {openChatBox &&
        <ChatWindow
          primaryUser={user}
          secondaryUser={teacherRecipient}
          handleClose={handleCloseChatBox}
        />
      }
    </>
  )
}