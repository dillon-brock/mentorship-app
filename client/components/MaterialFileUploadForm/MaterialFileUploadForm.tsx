import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { uploadFile } from "../../services/cloudinary/cloudinary";
import { addTeachingMaterial } from "../../services/teachingMaterials";
import styles from './materialFileUploadForm.module.css';
import globalStyles from '../../global.module.css';
import TeachingMaterial from "../../../server/models/TeachingMaterial";
import Subject from "../../../server/models/Subject";

type Props = {
  setShowUploadModal: Dispatch<SetStateAction<boolean>>;
  setTeachingMaterials: Dispatch<SetStateAction<TeachingMaterial[]>>;
  subjects: Subject[];
}

export default function MaterialFileUploadForm({ setShowUploadModal, setTeachingMaterials, subjects }: Props) {

  const [nameError, setNameError] = useState<string>('');
  const [subjectError, setSubjectError] = useState<string>('');
  const [fileError, setFileError] = useState<string>('');
  const [fileUrl, setFileUrl] = useState<string>('');

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const target: HTMLInputElement = e.target;
    const file = target.files ? target.files[0] : undefined;
    if (file != undefined) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.CLOUDINARY_PRESET_NAME);
      const fileUploadResponse = await uploadFile(formData);
      setFileUrl(fileUploadResponse.secure_url);
    }
  }

  const handleChangeName = () => setNameError('');

  const handleChangeSubject = () => setSubjectError('');

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if (!formData.get('name') || !formData.get('subject') || !fileUrl) {
      if (!formData.get('name')) {
        setNameError('Name is required.');
      }
      if (!formData.get('subject')) {
        setSubjectError('Subject is required.');
      }
      if (!fileUrl) setFileError('File is required.');
      return;
    }
    const newTeachingMaterial: TeachingMaterial = await addTeachingMaterial({
      subjectId: formData.get('subject'),
      url: fileUrl,
      type: 'file',
      name: formData.get('name')
    });

    setTeachingMaterials((prev) => [...prev, newTeachingMaterial]);
    setShowUploadModal(false);
  }

  return (
    <Form className={styles.form} onSubmit={handleUpload}>
      <Form.Group className="mb-3" controlId="file">
        <Form.Control 
          className={styles.input} 
          type="file" 
          name="file" 
          onChange={handleChangeFile} 
        />
        {fileError &&
          <Form.Text className="text-danger">{fileError}</Form.Text>
        }
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          className={styles.input} 
          type="text" 
          placeholder="File name" 
          name="name" 
          onChange={handleChangeName}
        />
        {nameError &&
          <>
            <Form.Text className="text-danger">{nameError}</Form.Text>
            <br />
          </>
        }
        <Form.Text>
          Give your file a descriptive name. This will help you and your students to more easily find what you are looking for.
        </Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Label>Subject</Form.Label>
        <Form.Select className={styles.input} name="subject" defaultValue='' onChange={handleChangeSubject}>
          <option disabled value=''>Choose the subject associated with this file...</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>{subject.subject}</option>
          ))}
        </Form.Select>
        {subjectError &&
          <Form.Text className="text-danger">{subjectError}</Form.Text>
        }
      </Form.Group>
      <div className={styles.buttonContainer}>
        <Button className={globalStyles.cancelButton} onClick={() => setShowUploadModal(false)}>Cancel</Button>
        <Button className={styles.uploadButton} type="submit">Upload</Button>
      </div>
    </Form>
  )
}