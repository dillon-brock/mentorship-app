import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import TeacherBioForm from "../TeacherBioForm/TeacherBioForm";
import TeacherLessonForm from "../TeacherLessonForm/TeacherLessonForm";
import TeacherSignUpForm from "../TeacherSignUpForm/TeacherSignUpForm";

export default function TeacherAuth() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [subjects, setSubjects] = useState([]);

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