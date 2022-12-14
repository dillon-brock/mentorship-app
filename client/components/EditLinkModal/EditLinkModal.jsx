import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updateTeachingMaterial } from "../../services/teachingMaterials";
import styles from './editLinkModal.module.css';
import globalStyles from '../../global.module.css';

export default function EditLinkModal({ subjects, id, name, url, subjectId, userWantsToEditLink, setUserWantsToEditLink, setTeachingMaterials }) {
  const [urlFromInput, setUrlFromInput] = useState(url);
  const [urlError, setUrlError] = useState('');

  const handleClose = () => setUserWantsToEditLink(false);

  const handleChangeUrl = (e) => {
    setUrlFromInput(e.target.value);
    if (urlError) setUrlError('');
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (!formData.get('url')) {
      setUrlError('URL is required.');
      return;
    }
    const updatedLink = await updateTeachingMaterial({
      id,
      name: formData.get('name'),
      url: formData.get('url'),
      subjectId: formData.get('subject')
    });
    setTeachingMaterials(prev => {
      let otherMaterials = prev.filter(material => material.id !== id);
      return [...otherMaterials, updatedLink]
    });
    setUserWantsToEditLink(false);
  };

  return (
    <Modal show={userWantsToEditLink} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3" controlId="url">
            <Form.Label>URL</Form.Label>
            <Form.Control 
              className={styles.input} 
              type="text" 
              name="url" 
              value={urlFromInput} 
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
              placeholder="File name" 
              name="name" 
              defaultValue={name}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Select className={styles.input} name="subject" defaultValue={subjectId}>
              <option disabled value=''>Choose the subject associated with this file...</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.subject}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className={styles.buttonContainer}>
            <Button 
              className={globalStyles.cancelButton} 
              onClick={() => setUserWantsToEditLink(false)}>
              Cancel
            </Button>
            <Button className={styles.updateButton} type="submit">Update</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}