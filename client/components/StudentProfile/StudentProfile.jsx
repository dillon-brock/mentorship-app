import { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { FaEdit } from 'react-icons/fa';
import useStudentProfile from "../../hooks/useStudentProfile"
import { updateAccount } from "../../services/student";
import UpdateProfilePictureModal from "../UpdateProfilePictureModal/UpdateProfilePictureModal";
import styles from './studentProfile.module.css';

export default function StudentProfile() {
  const { student, setStudent } = useStudentProfile();
  const [userWantsToEditProfile, setUserWantsToEditProfile] = useState(false);
  const [userWantsToEditImage, setUserWantsToEditImage] = useState(false);
  const [showEditImageButton, setShowEditImageButton] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAccount({ ...student });
    setUserWantsToEditProfile(false);
  }

  const handleSaveImage = async (url) => {
    setStudent({ ...student, imageUrl: url });
    await updateAccount({ ...student, imageUrl: url });
    setUserWantsToEditImage(false);
  }

  return (
    <div className={styles.container}>
        <h1 className={styles.title}>Your Profile</h1>
        <div 
          className={styles.imageContainer} 
          onMouseEnter={() => setShowEditImageButton(true)}
          onMouseLeave={() => setShowEditImageButton(false)}
        >
          {showEditImageButton &&
            <Button className={styles.editImageButton} onClick={setUserWantsToEditImage}>
              <FaEdit />
            </Button>
          }
          <Image roundedCircle src={student.imageUrl} style={{ width: '300px', height: '300px' }} />
        </div>
    {!userWantsToEditProfile &&
      <div className={styles.nameContainer}>
        <Button className={styles.editNameButton} onClick={() => setUserWantsToEditProfile(true)}>
          <FaEdit />
        </Button>
        <h3 className={styles.name}>{student.firstName} {student.lastName}</h3>
      </div>
    }
    {userWantsToEditProfile &&
      <>
        <Form onSubmit={handleSubmit}>
          <p>First Name</p>
          <Form.Control type="text" value={student.firstName} onChange={(e) => setStudent({ ...student, firstName: e.target.value })}/>
          <p>Last Name</p>
          <Form.Control type="text" value={student.lastName} onChange={(e) => setStudent({ ...student, lastName: e.target.value })} />
          <Button type="submit">Save Changes</Button>
        </Form>
      </>
    }
    <UpdateProfilePictureModal 
      userWantsToEditImage={userWantsToEditImage}
      setUserWantsToEditImage={setUserWantsToEditImage}
      originalImageUrl={student.imageUrl}
      handleSaveImage={handleSaveImage}
    />
    </div>
  )
}