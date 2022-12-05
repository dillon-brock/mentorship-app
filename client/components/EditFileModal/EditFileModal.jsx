import { useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { uploadFile } from "../../services/cloudinary";
import { updateTeachingMaterial } from "../../services/teachingMaterials";
import styles from './editFileModal.module.css';

export default function EditFileModal({ userWantsToEditFile, setUserWantsToEditFile, id, subjectId, name, url, setTeachingMaterials, subjects }) {

  const [newFile, setNewFile] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [nameFromInput, setNameFromInput] = useState(name);

  const handleClose = () => setUserWantsToEditFile(false);

  const handleChangeName = (e) => setNameFromInput(e.target.value);

  const handleChangeFile = (e) => {
    setNewFile(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.CLOUDINARY_PRESET_NAME);
    setFileData(formData);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    let fileUrl = url;
    if (newFile) {
      const fileUploadResponse = await uploadFile(fileData);
      fileUrl = fileUploadResponse.secure_url;
    }
    const formData = new FormData(e.target);
    const updatedFile = await updateTeachingMaterial({
      id,
      subjectId: formData.get('subject'),
      url: fileUrl,
      name: formData.get('name'),
    });
    setTeachingMaterials(prev => {
      let otherMaterials = prev.filter(material => material.id !== id);
      return [...otherMaterials, updatedFile]
    });
    setUserWantsToEditFile(false);
  }

  return (
    <>
      <Modal show={userWantsToEditFile} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdate}>
            <Form.Group className="mb-3" controlId="current-file">
              <Form.Label>Current File:</Form.Label>
                <a href={url} key={url} target="_blank">
                  <div className={styles.imageContainer}>
                    <Image src={`${url.slice(0, -3)}png`} style={{ width: '100%', height: '100%'}} rounded/>
                  </div>
                </a>
            </Form.Group>
            <Form.Group className="mb-3" controlId="file">
              <Form.Label>New File</Form.Label>
              <Form.Control className={styles.input} type="file" name="file" onChange={handleChangeFile}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control className={styles.input} type="text" placeholder="File name" name="name" value={nameFromInput} onChange={handleChangeName} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Select className={styles.input} name="subject" defaultValue={subjectId}>
                <option disabled value=''>Choose the subject associated with this file...</option>
                {subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.subject}</option>)}
              </Form.Select>
            </Form.Group>
            <div className={styles.buttonContainer}>
              <Button className={styles.cancelButton} onClick={() => setUserWantsToEditFile(false)}>Cancel</Button>
              <Button className={styles.updateButton} type="submit">Update</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}