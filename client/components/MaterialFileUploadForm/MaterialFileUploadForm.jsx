import { Form } from "react-bootstrap";

export default function MaterialFileUploadForm({ handleUploadFile, subjects }) {

  return (
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
        <Form.Label>Subject</Form.Label>
        <Form.Select>
          <option disabled>Choose the subject associated with this file...</option>
          {subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
        </Form.Select>
      </Form.Group>
      <Button>Upload</Button>
    </Form>
  )
}