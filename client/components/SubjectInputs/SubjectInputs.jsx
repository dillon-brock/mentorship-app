import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function SubjectInputs({ num, subjects, setSubjects }) {

  const [show, setShow] = useState(true);
  console.log(show, num);

  if (!show) return <div></div>

  const handleRemove = () => {
    setSubjects(prev => prev.filter(s => s !== num));
    setShow(false);
  }

  return (
    <div>
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
      <Button onClick={handleRemove}>Remove</Button>
    </div>
  )
}