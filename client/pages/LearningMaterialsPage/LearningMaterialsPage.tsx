import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import useLearningMaterials from "../../hooks/useLearningMaterials"
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import Header from "../../components/Header/Header";
import LearningMaterialsSection from "../../components/LearningMaterialsSection/LearningMaterialsSection";
import styles from './learningMaterialsPage.module.css';
import globalStyles from '../../global.module.css';
import Teacher from "../../../server/models/Teacher";
import { TeacherWithMaterials } from "../../types";
import NoTeachersDisplay from "../../components/NoTeachersDisplay/NoTeachersDisplay";

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
            <NoTeachersDisplay />
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