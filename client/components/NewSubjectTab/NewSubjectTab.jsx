import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { addSubject } from "../../services/subjects";

export default function NewSubjectTab({ setTeacher }) {

  const [formErrors, setFormErrors] = useState({});

  const handleChangeSubject = () => {
    if (formErrors.subject) setFormErrors({ ...formErrors, subject: ''});
  }

  const handleChangeMinPrice = () => {
    if (formErrors.minPrice) setFormErrors({ ...formErrors, minPrice: ''});
  }

  const handleChangeMaxPrice = () => {
    if (formErrors.maxPrice) setFormErrors({ ...formErrors, maxPrice: ''});
  }

  const handleChangeLessonType = () => {
    if (formErrors.lessonType) setFormErrors({ ...formErrors, lessonType: ''});
  }
  
  const isSubjectInvalid = (formData) => {
    let invalid = false;
    if (!formData.get('subject')) {
      setFormErrors({ ...formErrors, subject: 'Subject is required.'});
      invalid = true;
      return invalid;
    }
    if (!formData.get('minPrice')) {
      setFormErrors({ ...formErrors, minPrice: 'Minimum price is required.'});
      invalid = true;
      return invalid;
    }

    if (!formData.get('maxPrice')) {
      setFormErrors({ ...formErrors, maxPrice: 'Maximum price is required.'});
      invalid = true;
      return invalid;
    }

    if (!formData.get('lessonType')) {
      setFormErrors({ ...formErrors, lessonType: 'Lesson format is required.'});
      invalid = true;
      return invalid;
    }
  }

  const handleAddSubject = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (isSubjectInvalid(formData)) return;
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
        <Form.Control type="text" placeholder="Art" name="subject" onChange={handleChangeSubject} />
        {formErrors.subject &&
          <Form.Text className="text-danger">{formErrors.subject}</Form.Text>
        }
      </Form.Group>

      <Form.Group className="mb-2" controlId="cost">
        <Form.Label>Cost</Form.Label>
        <Container style={{ padding: '0', gap: '10px' }} className="d-flex align-items-center justify-content-start">
          <Container style={{ padding: '0' }} className="d-flex align-items-center justify-content-start">
            <p>$</p>
            <Form.Control type="number" name="minPrice" onChange={handleChangeMinPrice} />
          </Container>
          <p>to</p>
          <Container style={{ padding: '0' }} className="d-flex align-items-center justify-content-end">
            <p>$</p>
            <Form.Control type="number" name="maxPrice" onChange={handleChangeMaxPrice} />
          </Container>
        </Container>
        {formErrors.minPrice &&
          <Form.Text className="text-danger">{formErrors.minPrice}</Form.Text>
        }
        {formErrors.maxPrice&&
          <Form.Text className="text-danger">{formErrors.maxPrice}</Form.Text>
        }
      </Form.Group>

      <Form.Group className="mb-2" controlId="lessonType">
        <Form.Label>Lesson Format</Form.Label>
        <Form.Check name="lessonType" type="radio" label="In person" value="In person" onChange={handleChangeLessonType} />
        <Form.Check name="lessonType" type="radio" label="Remote" value="Remote" onChange={handleChangeLessonType} />
        <Form.Check name="lessonType" type="radio" label="Any" value="Any" onChange={handleChangeLessonType} />
        {formErrors.lessonType &&
          <Form.Text className="text-danger">{formErrors.lessonType}</Form.Text>
        }
      </Form.Group>
      <Button type="submit">Add Subject</Button>
    </Form>
  )
}