import { useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { uploadProfilePicture } from "../../services/cloudinary";
import { updateAccount } from "../../services/teacher";
import styles from './updateProfilePictureModal.module.css';

export default function UpdateProfilePictureModal({ 
  userWantsToEditImage, 
  setUserWantsToEditImage,
  teacher,
  setTeacher
}) {

  const [loadingPreview, setLoadingPreview] = useState(false);
  const [imageUrl, setImageUrl] = useState(teacher.imageUrl);
  console.log(teacher.imageUrl);

  const handleClose = () => setUserWantsToEditImage(false);

  const handleChangeImage = async (e) => {
    setLoadingPreview(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.CLOUDINARY_PRESET_NAME);
    const cloudinaryResponse = await uploadProfilePicture(formData);
    setImageUrl(cloudinaryResponse.secure_url);
    setLoadingPreview(false);
  }

  const handleSave = async () => {
    setTeacher({ ...teacher, imageUrl });
    await updateAccount({ ...teacher, imageUrl });
    setUserWantsToEditImage(false);
  }

  return (
    <Modal className={styles.modal} show={userWantsToEditImage} onHide={handleClose}>
      <Modal.Header className={styles.modal} closeButton>
        <Modal.Title>Update Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control className={styles.input} type="file" name="image" onChange={handleChangeImage} />
        {imageUrl && !loadingPreview &&
          <div>
            <h6 className={styles.previewTitle}>Preview:</h6>
            <div className={styles.imageContainer}>
              <Image className={styles.image} src={imageUrl} />
            </div>
          </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.buttonContainer}>
          <Button className={styles.cancelButton} onClick={handleClose}>Cancel</Button>
          <Button className={styles.saveButton} onClick={handleSave}>Save</Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}