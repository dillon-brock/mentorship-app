import { Form } from "react-bootstrap";

export default function MaterialLinkUploadForm({ subjects }) {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="url">
        <Form.Label>URL</Form.Label>
        <Form.Control type="text" name="url" placeholder="example.com/subject-info" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Subject Info on example.com" />
        <Form.Text>A name is not required for link uploads, but it&apos;s helpful for students to find materials.</Form.Text>
      </Form.Group>
      <Form.Group>
        <Form.Select>
        <option selected disabled value=''>Choose the subject associated with this link...</option>
        {subjects.map(subject => <option key={subject.id} value={subject.id}>{subject.name}</option>)}
        </Form.Select>
      </Form.Group>
      <Button>Upload</Button>
    </Form>
  )
}