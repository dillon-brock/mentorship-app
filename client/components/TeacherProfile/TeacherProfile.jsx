import { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext"
import { FaEdit } from 'react-icons/fa';
import { updateAccount } from "../../services/teacher";
import { getCityFromZipCode } from "../../services/zipcode";
import useTeacherProfile from "../../hooks/useTeacherProfile";
import SubjectList from "../SubjectList/SubjectList";
import UpdateProfilePictureModal from "../UpdateProfilePictureModal/UpdateProfilePictureModal";
import styles from './teacherProfile.module.css';
import UpdateTeacherProfileForm from "../UpdateTeacherProfileForm/UpdateTeacherProfileForm";

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
  } = useTeacherProfile(user.teacherId);
  const [userWantsToEditProfile, setUserWantsToEditProfile] = useState(false);
  const [userWantsToEditImage, setUserWantsToEditImage] = useState(false);
  const [showImageEditButton, setShowImageEditButton] = useState(false);

  const handleSaveImage = async (url) => {
    setTeacher({ ...teacher, imageUrl: url });
    await updateAccount({ ...teacher, imageUrl: url });
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
            {showImageEditButton &&
              <Button className={styles.imageEditButton} onClick={() => setUserWantsToEditImage(true)}>
                <FaEdit />
              </Button>
            }
            <Image fluid roundedCircle src={teacher.imageUrl} style={{width: '300px', height: '300px' }}/>
          </div>
          <div>
            <div className={styles.titleContainer}>
              <h1 className={styles.name}>{teacher.firstName} {teacher.lastName}</h1>
              <Button className={styles.editButton} onClick={() => setUserWantsToEditProfile(true)}>
                <FaEdit />
              </Button>
            </div>
            {teacher.city && teacher.state ? 
              <h5 className={styles.location}>{teacher.city}, {teacher.state}</h5>
              :
              <h5 className={styles.location}>{teacher.zipCode}</h5>
            }
            <p><strong>Phone: </strong>{teacher.phoneNumber}  |  <strong>Email: </strong>{teacher.contactEmail}</p>
          </div>
        </div>
        <div className={styles.detailsContainer}>
        <div>
          <h3>Bio</h3>
          <p>{teacher.bio}</p>
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
        zipCode={zipCode}
        setZipCode={setZipCode}
        cityName={cityName}
        setCityName={setCityName}
        stateName={stateName}
        setStateName={setStateName}
      />
    }
    {teacher.subjects &&
      <div className={styles.subjectsContainer}>
        <SubjectList subjects={teacher.subjects} setTeacher={setTeacher} displayOnly={false} />
      </div>
    }
    <UpdateProfilePictureModal
      userWantsToEditImage={userWantsToEditImage}
      setUserWantsToEditImage={setUserWantsToEditImage}
      originalImageUrl={teacher.imageUrl}
      handleSaveImage={handleSaveImage}
    />
    </div>
  )
}