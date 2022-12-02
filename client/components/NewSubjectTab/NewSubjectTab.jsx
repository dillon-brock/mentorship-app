import { Button, Form } from "react-bootstrap";
import { addSubject } from "../../services/subjects";

export default function NewSubjectTab({ setTeacher }) {

  const handleAddSubject = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newSubject = await addSubject({
      subject: formData.get('subject'),
      minPrice: formData.get('minPrice'),
      maxPrice: formData.get('maxPrice'),
      lessonType: formData.get('lessonType')
    });
    setTeacher(prev => ({
      ...prev,
      subjects: [
        ...prev.subjects,
        newSubject
      ]
    }));
    window.location.reload(true);
  }

  return (
    <Form onSubmit={handleAddSubject}>
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
      <Button type="submit">Add Subject</Button>
    </Form>
  )
}