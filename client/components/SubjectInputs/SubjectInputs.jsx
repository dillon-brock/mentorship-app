import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function SubjectInputs({ num, subjectNums, setSubjectNums }) {

  const [show, setShow] = useState(true);

  if (!show) return <div></div>

  const handleRemove = () => {
    setSubjectNums(prev => prev.filter(s => s !== num));
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
        <Form.Control type="number" placeholder="0" name={`minPrice-${num}`} />
        <p>to</p>
        <Form.Control type="number" placeholder="0" name={`maxPrice-${num}`} />
      </Form.Group>

      <Form.Group className="mb-2" controlId="lessonType">
        <Form.Label>Lesson Format</Form.Label>
        <Form.Check name={`lessonType-${num}`} type="radio" label="In person" value="In person"/>
        <Form.Check name={`lessonType-${num}`} type="radio" label="Remote" value="Remote" />
        <Form.Check name={`lessonType-${num}`} type="radio" label="Any" value="Any" />
      </Form.Group>
      <Button onClick={handleRemove}>Remove</Button>
    </div>
  )
}