import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import useLearningMaterials from "../../hooks/useLearningMaterials"
import ChatWindow from "../ChatWindow/ChatWindow";
import Header from "../Header/Header";
import LearningMaterialsSection from "../LearningMaterialsSection/LearningMaterialsSection";
import styles from './learningMaterialsPage.module.css';

export default function LearningMaterialsPage() {
  const { teachersWithMaterials } = useLearningMaterials();
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

  console.log(teachersWithMaterials);

  return (
    <>
      <Header />
      <h1 className={styles.title}>Your Learning Materials</h1>
      {teachersWithMaterials.map((teacher, i) => (
        <LearningMaterialsSection
          key={teacher.id}
          { ...teacher }
          i={i}
          setTeacherRecipient={setTeacherRecipient}
          handleMessage={(e) => handleMessage(teacher, e)}
        />
      ))}
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