import { Button, Container, Form } from "react-bootstrap";

export default function TeacherSearchForm({ setSubject }) {

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSubject(formData.get('subject'));
  }

  return (
    <Container>
      <p>Filter Results</p>
      <Form style={{ textAlign: 'left'}} onSubmit={onSubmit}>
        <Form.Group className="mb-2" controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Coding" name="subject" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Results
        </Button>
      </Form>
    </Container>
  )
}