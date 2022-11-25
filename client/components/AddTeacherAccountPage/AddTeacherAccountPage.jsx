import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { updateUserType } from "../../services/auth";
import { addTeacherAccount } from "../../services/teacher";
import { getCityFromZipCode } from "../../services/zipcode";
import Header from "../Header/Header";
import TeacherBioForm from "../TeacherBioForm/TeacherBioForm";
import TeacherLessonForm from "../TeacherLessonForm/TeacherLessonForm";

export default function AddTeacherAccountPage() {
  const { user, setUser, doneGettingUser } = useUserContext();
  const [step, setStep] = useState(1);
  const [showCity, setShowCity] = useState(false);
  const [cityName, setCityName] = useState('');
  const [stateName, setStateName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [subject, setSubject] = useState('');
  const [zipCode, setZipCode] = useState('');

  if (user && doneGettingUser && user.type === 'teacher') return <Navigate to='/my-students' />
  if (!user && doneGettingUser) return <Navigate to='/auth/sign-up/teacher' />

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

  const goToBioForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSubject(formData.get('subject'));
    setZipCode(formData.get('zip'));
    setStep(2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const teacherData = await addTeacherAccount({
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: imageUrl || user.imageUrl,
      subject,
      bio: formData.get('bio'),
      zipCode,
      phoneNumber: formData.get('phoneNumber'),
      contactEmail: formData.get('contactEmail'),
      city: cityName,
      state: stateName
    });
    await updateUserType('teacher');
    setUser({ ...user, type: 'teacher', teacherId: teacherData.id });
  }

  return (
    <>
      <Header />
      {step === 1 && 
        <TeacherLessonForm
          handleNext={goToBioForm}
          showCity={showCity}
          handleEnterZipCode={handleEnterZipCode}
          cityName={cityName}
          stateName={stateName}
        />
      }
      {step === 2 && 
        <TeacherBioForm handleSubmit={handleSubmit} imageUrl={imageUrl} setImageUrl={setImageUrl} />
      }
    </>
  )
}