import { Button, Form } from "react-bootstrap";

export default function TeacherLessonForm({ showCity, handleEnterZipCode, handleNext, cityName, stateName }) {
  
  return (
    <Form onSubmit={handleNext}>
      <Form.Group className="mb-2" controlId="subject">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" placeholder="Art" name="subject"></Form.Control>
      </Form.Group>

      <Form.Group className="mb-1" controlId="zipCode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type="number" placeholder="97214" name="zip" onBlur={handleEnterZipCode}></Form.Control>
      </Form.Group>

      {showCity &&
      <div>
        <Form.Text>
          {cityName}, {stateName}
        </Form.Text>
      </div>
      }
      <Button type="submit">Next</Button>
    </Form>
  );
}