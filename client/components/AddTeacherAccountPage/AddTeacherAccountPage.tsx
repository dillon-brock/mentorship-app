import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import Header from "../Header/Header";
import TeacherBioForm from "../TeacherBioForm/TeacherBioForm";
import TeacherLessonForm from "../TeacherLessonForm/TeacherLessonForm";
import Subject from "../../../server/models/Subject";

export default function AddTeacherAccountPage() {
  const { user, setUser, doneGettingUser } = useUserContext();
  const [step, setStep] = useState<number>(1);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  if (user && doneGettingUser && user.type === 'teacher') 
    return <Navigate to='/my-students' />
  if (!user && doneGettingUser) 
    return <Navigate to='/auth/sign-up/teacher' />

  return (
    <>
      <Header />
      {step === 1 && 
        <TeacherLessonForm
          setSubjects={setSubjects}
          setStep={setStep}
          newUser={false}
        />
      }
      {step === 2 && 
        <TeacherBioForm 
          subjects={subjects}
          newUser={false}
          setUser={setUser}
          user={user}
        />
      }
    </>
  )
}