import { Button, Form, Modal } from "react-bootstrap";

export default function EditFileModal({ userWantsToEditFile, setUserWantsToEditFile, id, name, url, subjectId, setTeachingMaterials, subjects }) {

  const handleClose = () => setUserWantsToEditFile(false);

  return (
    <>
      <Modal show={userWantsToEditFile} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update File:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="file">
              <Form.Control type="file" name="file" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="File name" name="name"/>
              <Form.Text>Give your file a descriptive name. This will help you and your students to more easily find what you are looking for.</Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label defaultValue={id}>Subject</Form.Label>
              <Form.Select name="subject">
                <option disabled value=''>Choose the subject associated with this file...</option>
                {subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
              </Form.Select>
            </Form.Group>
            <Button onClick={() => setUserWantsToEditFile(false)}>Cancel</Button>
            <Button type="submit">Upload</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}