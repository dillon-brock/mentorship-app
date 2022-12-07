import { useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { uploadProfilePicture } from "../../services/cloudinary";
import { updateAccount } from "../../services/teacher";

export default function UpdateProfilePictureModal({ 
  userWantsToEditImage, 
  setUserWantsToEditImage,
  teacher,
  setTeacher
}) {

  const { user } = useUserContext();
  const [imageData, setImageData] = useState(null);
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
    setImageData(formData);
  }

  const handleSave = async () => {
    setTeacher({ ...teacher, imageUrl });
    await updateAccount({ ...teacher, imageUrl });
    setUserWantsToEditImage(false);
  }

  return (
    <Modal show={userWantsToEditImage} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Profile Picture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control type="file" name="image" onChange={handleChangeImage} />
        {imageUrl && !loadingPreview &&
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
            <Image src={imageUrl} style={{ height: '240px', width: '240px' }} />
          </div>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  )
}