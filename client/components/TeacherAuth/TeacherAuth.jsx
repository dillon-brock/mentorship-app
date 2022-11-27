import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { getCityFromZipCode } from "../../services/zipcode";
import TeacherBioForm from "../TeacherBioForm/TeacherBioForm";
import TeacherLessonForm from "../TeacherLessonForm/TeacherLessonForm";
import TeacherSignUpForm from "../TeacherSignUpForm/TeacherSignUpForm";

export default function TeacherAuth() {
  const [step, setStep] = useState(1);
  const [showCity, setShowCity] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cityName, setCityName] = useState('');
  const [stateName, setStateName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [subject, setSubject] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const { user, setUser, doneGettingUser } = useUserContext();
  
  if (user && doneGettingUser) return <Navigate to='/my-students'/>

  const handleEnterZipCode = async (e) => {
    if (Number(e.target.value) && e.target.value.length === 5) {
      const { city, state } = await getCityFromZipCode(e.target.value);
      if (city && state) {
        setShowCity(true);
        setCityName(city);
        setStateName(state);
      }
    }
  }


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
          showCity={showCity}
          handleEnterZipCode={handleEnterZipCode}
          setZipCode={setZipCode}
          setSubject={setSubject}
          setStep={setStep}
          cityName={cityName}
          stateName={stateName}
        />
      }
      {step === 3 &&
        <TeacherBioForm
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          email={email}
          password={password}
          firstName={firstName}
          lastName={lastName}
          subject={subject}
          zipCode={zipCode}
          cityName={cityName}
          stateName={stateName}
          setUser={setUser}
        />
      }
    </>
  );
}