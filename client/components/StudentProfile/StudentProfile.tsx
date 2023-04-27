import { FormEvent, useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { FaEdit } from 'react-icons/fa';
import useStudentProfile from "../../hooks/useStudentProfile"
import { uploadProfilePicture } from "../../services/cloudinary";
import { updateAccount } from "../../services/student";
import UpdateProfilePictureModal from "../UpdateProfilePictureModal/UpdateProfilePictureModal";
import styles from './studentProfile.module.css';
import { Student } from "../../types";

export default function StudentProfile() {
  const { student, setStudent } = useStudentProfile();
  const [userWantsToEditProfile, setUserWantsToEditProfile] = useState<boolean>(false);
  const [userWantsToEditImage, setUserWantsToEditImage] = useState<boolean>(false);
  const [showEditImageButton, setShowEditImageButton] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateAccount({
      firstName: student?.firstName,
      lastName: student?.lastName,
      imageUrl: student?.imageUrl
    });
    setUserWantsToEditProfile(false);
  }

  const handleSaveImage = async (imageData: FormData | null) => {
    if (imageData) {
      const cloudinaryResponse = await uploadProfilePicture(imageData);
      const imageUrl = cloudinaryResponse.secure_url;
      setStudent({ ...(student as Student), imageUrl });
      await updateAccount({ ...(student as Student), imageUrl });
    }
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
            <Button className={styles.editImageButton} onClick={() => setUserWantsToEditImage(true)}>
              <FaEdit />
            </Button>
          }
          <Image roundedCircle src={student?.imageUrl} style={{ width: '300px', height: '300px' }} />
        </div>
    {!userWantsToEditProfile &&
      <div className={styles.nameContainer}>
        <Button className={styles.editNameButton} onClick={() => setUserWantsToEditProfile(true)}>
          <FaEdit />
        </Button>
        <h3 className={styles.name}>{student?.firstName} {student?.lastName}</h3>
      </div>
    }
    {userWantsToEditProfile &&
      <>
        <Form onSubmit={handleSubmit}>
          <Form.Label className={styles.label}>First Name</Form.Label>
          <Form.Control 
            className={styles.input} 
            type="text" 
            value={student?.firstName} 
            onChange={(e) => setStudent({ ...(student as Student), firstName: e.target.value })}
          />
          <Form.Label className={styles.label}>Last Name</Form.Label>
          <Form.Control 
            className={styles.input} 
            type="text" 
            value={student?.lastName} 
            onChange={(e) => setStudent({ ...(student as Student), lastName: e.target.value })} 
          />
          <div className={styles.buttonContainer}>
            <Button className={styles.saveButton} type="submit">Save Changes</Button>
          </div>
        </Form>
      </>
    }
    <UpdateProfilePictureModal 
      userWantsToEditImage={userWantsToEditImage}
      setUserWantsToEditImage={setUserWantsToEditImage}
      handleSaveImage={handleSaveImage}
    />
    </div>
  )
}