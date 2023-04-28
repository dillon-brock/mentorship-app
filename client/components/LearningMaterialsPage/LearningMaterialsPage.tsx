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
import Teacher from "../../../server/models/Teacher";
import { TeacherWithMaterials } from "../../types";

export default function LearningMaterialsPage() {
  const { teachersWithMaterials, loading } = useLearningMaterials();
  const { user, doneGettingUser } = useUserContext();
  const { pathname } = useLocation();
  const [openChatBox, setOpenChatBox] = useState<boolean>(false);
  const [teacherRecipient, setTeacherRecipient] = useState<Teacher | null>(null);

  const handleMessage = (teacher: Teacher, e: Event) => {
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
              {teachersWithMaterials.map((teacher: TeacherWithMaterials, i: number) => (
                <LearningMaterialsSection
                  key={teacher.id}
                  { ...teacher }
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
      {openChatBox && user &&
        <ChatWindow
          primaryUser={user}
          secondaryUser={teacherRecipient}
          handleClose={handleCloseChatBox}
        />
      }
    </>
  )
}