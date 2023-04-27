import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import styles from './updateProfilePictureModal.module.css';
import globalStyles from '../../global.module.css';

type Props = {
  userWantsToEditImage: boolean;
  setUserWantsToEditImage: Dispatch<SetStateAction<boolean>>;
  handleSaveImage: (imageData: FormData | null) => void;
}

export default function UpdateProfilePictureModal({ 
  userWantsToEditImage, 
  setUserWantsToEditImage,
  handleSaveImage
}: Props) {

  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [imageData, setImageData] = useState<FormData | null>(null);

  const handleClose = () => setUserWantsToEditImage(false);

  const handleChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files ? e.target.files[0] : undefined;
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.CLOUDINARY_PRESET_NAME);
      setImageData(formData);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  }

  return (
    <Modal className={styles.modal} show={userWantsToEditImage} onHide={handleClose}>
      <Modal.Header className={styles.modal} closeButton>
        <Modal.Title>Update Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control 
          className={styles.input} 
          type="file" 
          name="image" 
          onChange={handleChangeImage} 
        />
        {imagePreviewUrl &&
          <div className={styles.imageContainer}>
            <Image className={styles.image} src={imagePreviewUrl} />
          </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <div className={styles.buttonContainer}>
          <Button className={globalStyles.cancelButton} onClick={handleClose}>Cancel</Button>
          <Button 
            className={styles.saveButton} 
            onClick={() => handleSaveImage(imageData)}>
            Save
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}