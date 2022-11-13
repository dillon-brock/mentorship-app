import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function TeacherSearchForm({ setSubject, setZipCode, setRadius }) {

  const [radiusForDisplay, setRadiusForDisplay] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSubject(formData.get('subject'));
    setZipCode(formData.get('zipCode'));
    setRadius(formData.get('radius'));
  }

  return (
    <Container>
      <p>Filter Results</p>
      <Form style={{ textAlign: 'left'}} onSubmit={onSubmit}>
        <Form.Group className="mb-2" controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Coding" name="subject" />
        </Form.Group>
        <Form.Group className="mb-2" controlId="zipCode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control type="number" minLength="5" maxLength="5" placeholder="97214" name="zipCode" />
        </Form.Group>
        <Form.Group className="mb-2" controlId="radius">
          <Form.Label>Distance</Form.Label>
          <Form.Control type="range" min="0" max="50" step="5" name="radius" onInput={(e) => setRadiusForDisplay(e.target.value)}/>
          <Form.Text>{radiusForDisplay} miles</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Results
        </Button>
      </Form>
    </Container>
  )
}