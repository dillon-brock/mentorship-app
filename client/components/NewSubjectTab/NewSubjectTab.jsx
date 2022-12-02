import { Form } from "react-bootstrap";

export default function NewSubjectTab() {
  return (
    <Form>
      <Form.Group className="mb-2" controlId="subject">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" placeholder="Art" name="subject" />
        {/* {formErrors.subject &&
          <Form.Text className="text-danger">{formErrors.subject}</Form.Text>
        } */}
      </Form.Group>

      <Form.Group className="mb-2" controlId="cost">
        <Form.Label>Cost</Form.Label>
        <Form.Control type="number" placeholder="0" name="minPrice"/>
        {/* {formErrors.minPrice &&
          <Form.Text className="text-danger">{formErrors.minPrice}</Form.Text>
        } */}
        <p>to</p>
        <Form.Control type="number" placeholder="0" name="maxPrice" />
        {/* {formErrors.maxPrice &&
          <Form.Text className="text-danger">{formErrors.maxPrice}</Form.Text>
        } */}
      </Form.Group>

      <Form.Group className="mb-2" controlId="lessonType">
        <Form.Label>Lesson Format</Form.Label>
        <Form.Check name="lessonType" type="radio" label="In person" value="In person" />
        <Form.Check name="lessonType" type="radio" label="Remote" value="Remote" />
        <Form.Check name="lessonType" type="radio" label="Any" value="Any" />
        {/* {formErrors.lessonType &&
          <Form.Text className="text-danger">{formErrors.lessonType}</Form.Text>
        } */}
      </Form.Group>
    </Form>
  )
}