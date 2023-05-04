import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { addTeachingMaterial } from "../../services/teachingMaterials/teachingMaterials";
import styles from './materialLinkUploadForm.module.css';
import globalStyles from '../../global.module.css';
import Subject from "../../../server/models/Subject";
import TeachingMaterial from "../../../server/models/TeachingMaterial";
import SubjectSelect from "../SubjectSelect/SubjectSelect";

type Props = {
  subjects: Subject[];
  setTeachingMaterials: Dispatch<SetStateAction<TeachingMaterial[]>>;
  setShowUploadModal: Dispatch<SetStateAction<boolean>>;
}

export default function MaterialLinkUploadForm({ subjects, setTeachingMaterials, setShowUploadModal }: Props) {

  const [urlError, setUrlError] = useState<string>('');
  const [subjectError, setSubjectError] = useState<string>('');

  const handleChangeUrl = () => setUrlError('');

  const handleChangeSubject = () => setSubjectError('');

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if (!formData.get('url') || !formData.get('subject')) {
      if (!formData.get('url')) setUrlError('URL is required.');
      if (!formData.get('subject')) setSubjectError('Subject is required.');
      return;
    }
    const newTeachingMaterial: TeachingMaterial = await addTeachingMaterial({
      subjectId: formData.get('subject') as string,
      name: formData.get('name') ? formData.get('name') as string : null,
      url: formData.get('url') as string,
      type: 'link'
    });
    setTeachingMaterials(prev => [...prev, newTeachingMaterial]);
    setShowUploadModal(false);
  }

  return (
    <Form className={styles.form} onSubmit={handleUpload}>
      <Form.Group className="mb-3" controlId="url">
        <Form.Label>URL</Form.Label>
        <Form.Control 
          className={styles.input} 
          type="text" 
          name="url"
          placeholder="example.com/subject-info" 
          onChange={handleChangeUrl} 
        />
        {urlError &&
          <Form.Text className="text-danger">{urlError}</Form.Text>
        }
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          className={styles.input} 
          type="text" 
          name="name" 
          placeholder="Subject Info on example.com" 
        />
        <Form.Text>A name is not required for link uploads, but it&apos;s helpful for students to find materials.</Form.Text>
      </Form.Group>
      <Form.Group>
        <SubjectSelect 
          subjects={subjects} 
          error={subjectError} 
          handleChangeSubject={handleChangeSubject}
          defaultValue=""
          firstOption="Choose the subject associated with this link..." />
      </Form.Group>
      <div className={styles.buttonContainer}>
        <Button className={globalStyles.cancelButton} onClick={() => setShowUploadModal(false)}>Cancel</Button>
        <Button className={styles.uploadButton} type="submit">Upload</Button>
      </div>
    </Form>
  )
}