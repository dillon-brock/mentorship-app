import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function TeacherSearchForm({ setSubject, setZipCode, setRadius, errorMessage, setErrorMessage }) {

  const [radiusForDisplay, setRadiusForDisplay] = useState(25);

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
          <Form.Control type="range" min="0" max="50" step="5" name="radius" value={radiusForDisplay} onInput={(e) => setRadiusForDisplay(e.target.value)}/>
          <Form.Text>{radiusForDisplay} miles</Form.Text>
        </Form.Group>
        {errorMessage && 
          <Form.Text className="text-danger">{errorMessage}</Form.Text>
        }
        <Button variant="primary" type="submit">
          Update Results
        </Button>
      </Form>
    </Container>
  )
}