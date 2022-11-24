import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { getUser, signUpTeacher, signUpUser } from "../../services/auth";
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

  const goToLessonForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setEmail(formData.get('email'));
    setPassword(formData.get('password'));
    setFirstName(formData.get('firstName'));
    setLastName(formData.get('lastName'));
    setStep(2);
  }

  const goToBioForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSubject(formData.get('subject'));
    setZipCode(formData.get('zip'));
    setStep(3);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData.get('bio'), formData.get('contactEmail'), formData.get('phoneNumber'));
    await signUpTeacher({
      email,
      password,
      firstName,
      lastName,
      subject,
      bio: formData.get('bio'),
      zipCode,
      phoneNumber: formData.get('phoneNumber'),
      contactEmail: formData.get('contactEmail'),
      imageUrl,
      city: cityName,
      state: stateName
    });
    const signedInTeacher = await getUser();
    setUser(signedInTeacher);
  }


  return (
    <>
      {step === 1 &&
        <TeacherSignUpForm handleNext={goToLessonForm}/>
      }
      {step === 2 &&
        <TeacherLessonForm
          showCity={showCity}
          handleEnterZipCode={handleEnterZipCode}
          handleNext={goToBioForm}
          cityName={cityName}
          stateName={stateName}
        />
      }
      {step === 3 &&
        <TeacherBioForm
          handleSubmit={handleSubmit}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
      }
    </>
  );
}