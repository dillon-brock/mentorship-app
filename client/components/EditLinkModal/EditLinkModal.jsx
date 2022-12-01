import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function EditLinkModal({ subjects, id, name, url, subjectId, userWantsToEditLink, setUserWantsToEditLink }) {
  const [nameFromInput, setNameFromInput] = useState(name);
  const [urlFromInput, setUrlFromInput] = useState(url);

  const handleUpdate = () => {};

  return (
    <Modal show={userWantsToEditLink} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Link</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3" controlId="url">
            <Form.Label>URL</Form.Label>
            <Form.Control type="text" /> 
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="File name" name="name" value={nameFromInput} onChange={handleChangeName} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="subject">
            <Form.Label>Subject</Form.Label>
            <Form.Select name="subject" defaultValue={subjectId}>
              <option disabled value=''>Choose the subject associated with this file...</option>
              {subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
            </Form.Select>
          </Form.Group>
          <Button onClick={() => setUserWantsToEditLink(false)}>Cancel</Button>
          <Button type="submit">Update</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}