import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import TeacherBioForm from "../TeacherBioForm/TeacherBioForm";
import TeacherLessonForm from "../TeacherLessonForm/TeacherLessonForm";
import TeacherSignUpForm from "../TeacherSignUpForm/TeacherSignUpForm";
import { NumberedSubject } from "../../types";

export default function TeacherAuth() {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [subjects, setSubjects] = useState<NumberedSubject[]>([]);

  const { user, setUser, doneGettingUser } = useUserContext();
  
  if (user && doneGettingUser) return <Navigate to='/my-students'/>


  return (
    <>
      {step === 1 &&
        <TeacherSignUpForm
          setEmail = {setEmail}
          setPassword = {setPassword}
          setFirstName = {setFirstName}
          setLastName = {setLastName}
          setStep = {setStep}
        />
      }
      {step === 2 &&
        <TeacherLessonForm
          setSubjects={setSubjects}
          setStep={setStep}
          newUser={true}
        />
      }
      {step === 3 &&
        <TeacherBioForm
          email={email}
          password={password}
          firstName={firstName}
          lastName={lastName}
          subjects={subjects}
          setUser={setUser}
          newUser={true}
          user={user}
        />
      }
    </>
  );
}