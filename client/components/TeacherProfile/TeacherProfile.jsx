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
import globalStyles from '../../global.module.css';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAccount({ ...teacher })
    setUserWantsToEditProfile(false);
  }

  const handleChangeZipCode = async (e) => {
    if (Number(e.target.value) && e.target.value.length === 5) {
      const { city, state } = await getCityFromZipCode(e.target.value);
      if (city && state) {
        setCityName(city);
        setStateName(state);
        setTeacher({ ...teacher, zipCode, city, state })
      }
    }
  }

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
      <>
        <Form onSubmit={handleSubmit} className={styles.form} >
          <div className={styles.formContent}>
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
              <Image 
                roundedCircle 
                src={teacher.imageUrl} 
                style={{ width: '300px', height: '300px' }} 
                />
            </div>
            <div>
              <h3 className={styles.editTitle}>Edit Your Profile</h3>
              <Form.Label className={styles.label}>First Name</Form.Label>
              <Form.Control 
                className={styles.input} 
                type="text" 
                value={teacher.firstName} 
                onChange={(e) => setTeacher({ ...teacher, firstName: e.target.value })}
              />
              <Form.Label className={styles.label}>Last Name</Form.Label>
              <Form.Control 
                className={styles.input} 
                type="text" 
                value={teacher.lastName} 
                onChange={(e) => setTeacher({ ...teacher, lastName: e.target.value })} 
              />
              <Form.Label className={styles.label}>Zip Code</Form.Label>
              <Form.Control 
                className={styles.input} 
                type="number" 
                value={zipCode} 
                onChange={(e) => setZipCode(e.target.value)} 
                onBlur={handleChangeZipCode}
              />
              <p className={styles.formCity}>{cityName}, {stateName}</p>
              <Form.Label className={styles.label}>Phone Number</Form.Label>
              <Form.Control 
                className={styles.input} 
                type="text" 
                value={teacher.phoneNumber} 
                onChange={(e) => setTeacher({ ...teacher, phoneNumber: e.target.value })} 
              />
              <Form.Label className={styles.label}>Contact Email</Form.Label>
              <Form.Control 
                type="email" 
                className={styles.input} 
                value={teacher.contactEmail} 
                onChange={(e) => setTeacher({ ...teacher, contactEmail: e.target.value })} 
              />
              <Form.Label className={styles.label}>Bio</Form.Label>
              <Form.Control 
                as="textarea"
                rows="6" 
                className={styles.input} 
                value={teacher.bio} 
                onChange={(e) => setTeacher({ ...teacher, bio: e.target.value })} 
              />
              <div className={styles.buttonContainer}>
                <Button className={globalStyles.cancelButton} onClick={() => setUserWantsToEditProfile(false)}>Cancel</Button>
                <Button className={styles.saveButton} type="submit">Save Changes</Button>
              </div>
            </div>
          </div>
        </Form>
      </>
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