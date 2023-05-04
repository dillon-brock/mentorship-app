import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { updateTeachingMaterial } from "../../services/teachingMaterials/teachingMaterials";
import styles from './editLinkModal.module.css';
import globalStyles from '../../global.module.css';
import Subject from "../../../server/models/Subject";
import TeachingMaterial from "../../../server/models/TeachingMaterial";
import SubjectSelect from "../SubjectSelect/SubjectSelect";

type Props = {
  subjects: Subject[];
  id: string;
  name: string | undefined;
  url: string;
  subjectId: string;
  userWantsToEditLink: boolean;
  setUserWantsToEditLink: Dispatch<SetStateAction<boolean>>;
  setTeachingMaterials: Dispatch<SetStateAction<TeachingMaterial[]>>;
}

export default function EditLinkModal({ 
  subjects, id, name, url, subjectId, userWantsToEditLink, 
  setUserWantsToEditLink, setTeachingMaterials }: Props) {

  const [urlFromInput, setUrlFromInput] = useState<string>(url);
  const [urlError, setUrlError] = useState<string>('');

  const handleClose = () => setUserWantsToEditLink(false);

  const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) => {
    setUrlFromInput(e.target.value);
    if (urlError) setUrlError('');
  }

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if (!formData.get('url')) {
      setUrlError('URL is required.');
      return;
    }
    const updatedLink: TeachingMaterial = await updateTeachingMaterial({
      id,
      name: formData.get('name') ? formData.get('name') as string : null,
      url: formData.get('url') as string,
      subjectId: formData.get('subject') as string
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
            <SubjectSelect 
              subjects={subjects} 
              showLabel={true} 
              defaultValue={subjectId} 
              firstOption="Choose the subject associated with this link..."
              className={styles.input}
            />
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