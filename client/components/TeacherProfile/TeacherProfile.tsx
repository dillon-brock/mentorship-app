import { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext"
import { FaEdit } from 'react-icons/fa';
import { updateAccount } from "../../services/teacher/teacher";
import useTeacherProfile from "../../hooks/useTeacherProfile";
import SubjectList from "../SubjectList/SubjectList";
import UpdateProfilePictureModal from "../UpdateProfilePictureModal/UpdateProfilePictureModal";
import styles from './teacherProfile.module.css';
import UpdateTeacherProfileForm from "../UpdateTeacherProfileForm/UpdateTeacherProfileForm";
import { uploadProfilePicture } from "../../services/cloudinary/cloudinary";
import EditableProfilePicture from "../EditableProfilePicture/EditableProfilePicture";

export default function TeacherProfile() {
  const { user } = useUserContext();
  const { 
    teacher, 
    setTeacher, 
    zipCode,
    setZipCode, 
    stateName, 
    setStateName, 
    cityName, 
    setCityName 
  } = useTeacherProfile(user?.teacherId as string);
  const [userWantsToEditProfile, setUserWantsToEditProfile] = useState<boolean>(false);
  const [userWantsToEditImage, setUserWantsToEditImage] = useState<boolean>(false);
  const [showImageEditButton, setShowImageEditButton] = useState<boolean>(false);

  const handleSaveImage = async (imageData: FormData | null) => {
    if (imageData) {
      const cloudinaryResponse = await uploadProfilePicture(imageData);
      const imageUrl = cloudinaryResponse.secure_url
      if (teacher) {
        setTeacher({ ...teacher, imageUrl});
        await updateAccount({ 
          ...teacher, 
          imageUrl, 
          city: teacher.city || '',
          state: teacher.state || ''
        });
      }
    }
    setUserWantsToEditImage(false);
  }

  return (
    <div className={styles.pageContainer}>
    {!userWantsToEditProfile &&
    <div className={styles.profileContainer}>
      <div className={styles.infoContainer}>
          <div 
            className={styles.imageContainer} 
            onMouseEnter={() => setShowImageEditButton(true)}
            onMouseLeave={() => setShowImageEditButton(false)}
          >
            <EditableProfilePicture 
              showButton={showImageEditButton} 
              imgSrc={teacher?.imageUrl} 
              onClick={() => setUserWantsToEditImage(true)} />
          </div>
          <div>
            <div className={styles.titleContainer}>
              <h1 className={styles.name}>{teacher?.firstName} {teacher?.lastName}</h1>
              <Button className={styles.editButton} onClick={() => setUserWantsToEditProfile(true)}>
                <FaEdit />
              </Button>
            </div>
            {teacher?.city && teacher?.state ? 
              <h5 className={styles.location}>{teacher?.city}, {teacher?.state}</h5>
              :
              <h5 className={styles.location}>{teacher?.zipCode}</h5>
            }
            <p><strong>Phone: </strong>{teacher?.phoneNumber}  |  <strong>Email: </strong>{teacher?.contactEmail}</p>
          </div>
        </div>
        <div className={styles.detailsContainer}>
        <div>
          <h3>Bio</h3>
          <p>{teacher?.bio}</p>
        </div>
      </div>
    </div>
    }
    {userWantsToEditProfile && 
      <UpdateTeacherProfileForm
        teacher={teacher}
        setTeacher={setTeacher}
        showImageEditButton={showImageEditButton}
        setShowImageEditButton={setShowImageEditButton}
        setUserWantsToEditProfile={setUserWantsToEditProfile}
        setUserWantsToEditImage={setUserWantsToEditImage}
        zipCode={zipCode}
        setZipCode={setZipCode}
        cityName={cityName}
        setCityName={setCityName}
        stateName={stateName}
        setStateName={setStateName}
      />
    }
    {teacher?.subjects &&
      <div className={styles.subjectsContainer}>
        <SubjectList subjects={teacher?.subjects} setTeacher={setTeacher} displayOnly={false} />
      </div>
    }
    <UpdateProfilePictureModal
      userWantsToEditImage={userWantsToEditImage}
      setUserWantsToEditImage={setUserWantsToEditImage}
      handleSaveImage={handleSaveImage}
    />
    </div>
  )
}