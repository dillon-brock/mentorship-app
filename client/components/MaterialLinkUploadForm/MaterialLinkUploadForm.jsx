import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { addTeachingMaterial } from "../../services/teachingMaterials";
import styles from './materialLinkUploadForm.module.css';
import globalStyles from '../../global.module.css';

export default function MaterialLinkUploadForm({ subjects, setTeachingMaterials, setShowUploadModal }) {

  const [urlError, setUrlError] = useState('');
  const [subjectError, setSubjectError] = useState('');

  const handleChangeUrl = () => setUrlError('');

  const handleChangeSubject = () => setSubjectError('');

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formData.get('url') || !formData.get('subject')) {
      if (!formData.get('url')) setUrlError('URL is required.');
      if (!formData.get('subject')) setSubjectError('Subject is required.');
      return;
    }
    const newTeachingMaterial = await addTeachingMaterial({
      subjectId: formData.get('subject'),
      name: formData.get('name'),
      url: formData.get('url'),
      type: 'link'
    });
    setTeachingMaterials(prev => [...prev, newTeachingMaterial]);
    setShowUploadModal(false);
  }

  return (
    <Form className={styles.form} onSubmit={handleUpload}>
      <Form.Group className="mb-3" controlId="url">
        <Form.Label>URL</Form.Label>
        <Form.Control className={styles.input} type="text" name="url" placeholder="example.com/subject-info" onChange={handleChangeUrl} />
        {urlError &&
          <Form.Text className="text-danger">{urlError}</Form.Text>
        }
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control className={styles.input} type="text" name="name" placeholder="Subject Info on example.com" />
        <Form.Text>A name is not required for link uploads, but it&apos;s helpful for students to find materials.</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Select className={styles.input} name="subject" defaultValue='' onChange={handleChangeSubject}>
        <option disabled value=''>Choose the subject associated with this link...</option>
        {subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.subject}</option>)}
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