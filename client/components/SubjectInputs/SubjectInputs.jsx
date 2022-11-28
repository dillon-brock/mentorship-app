import { Form } from "react-bootstrap";

export default function SubjectInputs({ num }) {

  return (
    <>
      <Form.Group className="mb-2" controlId="subject">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" placeholder="Art" name={`subject-${num}`} />
      </Form.Group>

      <Form.Group className="mb-2" controlId="cost">
        <Form.Label>Cost</Form.Label>
        <Form.Control type="text" placeholder="0" name={`minPrice-${num}`} />
        <p>to</p>
        <Form.Control type="text" placeholder="0" name={`maxPrice-${num}`} />
      </Form.Group>

      <Form.Group className="mb-2" controlId="lessonType">
        <Form.Label>Lesson Format</Form.Label>
        <Form.Check type="radio" label="In person" value="In person"/>
        <Form.Check type="radio" label="Remote" value="Remote" />
        <Form.Check type="radio" label="Any" value="Any" />
      </Form.Group>
    </>
  )
}