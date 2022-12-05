import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { uploadFile } from "../../services/cloudinary";
import { addTeachingMaterial } from "../../services/teachingMaterials";
import styles from './materialFileUploadForm.module.css';

export default function MaterialFileUploadForm({ setShowUploadModal, setTeachingMaterials, subjects }) {

  const [fileData, setFileData] = useState(null);

  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.CLOUDINARY_PRESET_NAME);
    setFileData(formData);
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    const fileUploadResponse = await uploadFile(fileData);
    const formData = new FormData(e.target);
    const newTeachingMaterial = await addTeachingMaterial({
      subjectId: formData.get('subject'),
      url: fileUploadResponse.secure_url,
      type: 'file',
      name: formData.get('name')
    });

    setTeachingMaterials((prev) => [...prev, newTeachingMaterial]);
    setShowUploadModal(false);
  }

  return (
    <Form className={styles.form} onSubmit={handleUpload}>
      <Form.Group className="mb-3" controlId="file">
        <Form.Control className={styles.input} type="file" name="file" onChange={handleChangeFile} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control className={styles.input} type="text" placeholder="File name" name="name"/>
        <Form.Text>Give your file a descriptive name. This will help you and your students to more easily find what you are looking for.</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Subject</Form.Label>
        <Form.Select className={styles.input} name="subject">
          <option selected disabled value=''>Choose the subject associated with this file...</option>
          {subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
        </Form.Select>
      </Form.Group>
      <div className={styles.buttonContainer}>
        <Button className={styles.cancelButton} onClick={() => setShowUploadModal(false)}>Cancel</Button>
        <Button className={styles.uploadButton} type="submit">Upload</Button>
      </div>
    </Form>
  )
}