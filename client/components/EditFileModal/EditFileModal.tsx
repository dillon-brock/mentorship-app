import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import { uploadFile } from "../../services/cloudinary/cloudinary";
import { updateTeachingMaterial } from "../../services/teachingMaterials";
import styles from './editFileModal.module.css';
import globalStyles from '../../global.module.css';
import TeachingMaterial from "../../../server/models/TeachingMaterial";
import Subject from "../../../server/models/Subject";

type Props = {
  userWantsToEditFile: boolean;
  setUserWantsToEditFile: Dispatch<SetStateAction<boolean>>;
  id: string;
  subjectId: string;
  name: string;
  url: string;
  setTeachingMaterials: Dispatch<SetStateAction<TeachingMaterial[]>>;
  subjects: Subject[];
}

export default function EditFileModal({ 
  userWantsToEditFile, 
  setUserWantsToEditFile, 
  id, 
  subjectId, 
  name, 
  url, 
  setTeachingMaterials, 
  subjects 
}: Props) {

  const [newFile, setNewFile] = useState<boolean>(false);
  const [nameFromInput, setNameFromInput] = useState<string>(name);
  const [previewUrl, setPreviewUrl] = useState<string>(`${url.slice(0, -3)}png`);
  const [uploadUrl, setUploadUrl] = useState<string>(url);
  const [nameError, setNameError] = useState<string>('');
  const [subjectError, setSubjectError] = useState<string>('');

  const handleClose = () => setUserWantsToEditFile(false);

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setNameFromInput(e.target.value);
    if (nameError) setNameError('');
  }

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    setNewFile(true);
    const target: HTMLInputElement = e.target;
    const file: File | undefined = target.files ? target.files[0] : undefined;
    if (file != undefined) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', process.env.CLOUDINARY_PRESET_NAME);
      const fileUploadResponse = await uploadFile(formData);
      setUploadUrl(fileUploadResponse.secure_url);
      setPreviewUrl(`${fileUploadResponse.secure_url.slice(0, -3)}png`);
    }
  }

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    let fileUrl: string = url;
    if (newFile) fileUrl = uploadUrl;
    const formData = new FormData(e.target as HTMLFormElement);
    
    if (!formData.get('name')) {
      setNameError('Name is required.');
      return;
    }

    if (!formData.get('subject')) {
      setSubjectError('Subject is required.');
      return;
    }

    const updatedFile: TeachingMaterial = await updateTeachingMaterial({
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
            <Form.Group className="mb-3" controlId="file">
              <Form.Label>New File</Form.Label>
              <Form.Control 
                className={styles.input} 
                type="file" 
                name="file" 
                onChange={handleChangeFile}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="current-file">
              <Form.Label>Preview:</Form.Label>
                <a href={url} key={url} target="_blank">
                  <div className={styles.imageContainer}>
                    <Image src={previewUrl} style={{ width: '100%', height: '100%'}} rounded/>
                  </div>
                </a>
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                className={styles.input} 
                type="text" 
                placeholder="File name" 
                name="name" 
                value={nameFromInput} 
                onChange={handleChangeName} 
              />
              {nameError &&
                <Form.Text className="text-danger">{nameError}</Form.Text>
              }
            </Form.Group>
            <Form.Group className="mb-3" controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Select className={styles.input} name="subject" defaultValue={subjectId}>
                <option disabled value=''>Choose the subject associated with this file...</option>
                {subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.subject}</option>)}
              </Form.Select>
              {subjectError &&
                <Form.Text className="text-danger">{subjectError}</Form.Text>
              }
            </Form.Group>
            <div className={styles.buttonContainer}>
              <Button 
                className={globalStyles.cancelButton} 
                onClick={() => setUserWantsToEditFile(false)}>
                Cancel
              </Button>
              <Button className={styles.updateButton} type="submit">Update</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}