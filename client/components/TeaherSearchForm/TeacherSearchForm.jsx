import { useState } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";

export default function TeacherSearchForm({ setSubject, setZipCode, setRadius, setMinPrice, setMaxPrice, setLessonType, errorMessage, setErrorMessage }) {

  const [radiusForDisplay, setRadiusForDisplay] = useState(25);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setSubject(formData.get('subject'));
    setZipCode(formData.get('zipCode'));
    setRadius(formData.get('radius'));
    setLessonType(formData.get('lessonType'));
    if (formData.get('minPrice')) setMinPrice(formData.get('minPrice'));
    if (formData.get('maxPrice')) setMaxPrice(formData.get('maxPrice'));
  }

  return (
    <Container>
      <p>Filter Results</p>
      <Form style={{ textAlign: 'left'}} onSubmit={handleSubmit}>
        <Form.Group className="mb-2" controlId="subject">
          <Form.Label>Subject</Form.Label>
          <Form.Control type="text" placeholder="Coding" name="subject" />
        </Form.Group>
        <Form.Group className="mb-2" controlId="zipCode">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control type="number" minLength="5" maxLength="5" placeholder="97214" name="zipCode" onChange={() => setErrorMessage('')} />
        </Form.Group>
        <Form.Group className="mb-2" controlId="radius">
          <Form.Label>Distance</Form.Label>
          <Form.Control type="range" min="0" max="50" step="5" name="radius" value={radiusForDisplay} onInput={(e) => setRadiusForDisplay(e.target.value)}/>
          <Form.Text>{radiusForDisplay} miles</Form.Text>
        </Form.Group>
        {errorMessage && 
          <Form.Text className="text-danger">{errorMessage}</Form.Text>
        }
        
        <Form.Group className="mb-2" controlId="lessonType">
          <Form.Label>Lesson Format</Form.Label>
          <Form.Select name="lessonType">
            <option value="Any">Any</option>
            <option value="In person">In person</option>
            <option value="Remote">Remote</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-2" controlId="price">
          <Form.Label>Price Range</Form.Label>
          <Container className="d-flex align-items-end justify-content-start">
            <Col className="d-flex flex-column">
              <Form.Text>Min</Form.Text>
              <Form.Control type="number" placeholder="0" name="minPrice" style={{ width: '40%'}} />
            </Col>
            <Col className="d-flex flex-column">
              <Form.Text>Max</Form.Text>
              <Form.Control type="number" placeholder="100" name="maxPrice" style={{ width: '40%'}}/>
            </Col>
          </Container>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Results
        </Button>
      </Form>
    </Container>
  )
}