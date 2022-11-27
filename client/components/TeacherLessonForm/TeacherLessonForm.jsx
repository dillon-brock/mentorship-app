import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function TeacherLessonForm({ showCity, handleEnterZipCode, setSubject, setZipCode, setStep, cityName, stateName }) {

  const subjectInputRef = useRef();
  const zipCodeInputRef = useRef();
  const [formErrors, setFormErrors] = useState({});
  console.log(formErrors);

  const isFormInvalid = () => {
    let invalid = false;

    if (zipCodeInputRef.current.value === '') {
      setFormErrors({ ...formErrors, zipCode: 'Zip code is required'});
      invalid = true;
    }
    
    if (subjectInputRef.current.value === '') {
      setFormErrors({ ...formErrors, subject: 'Subject is required'});
      invalid = true;
    }

    return invalid;
  };

  const handleChangeSubject = () => {
    if (formErrors.subject) setFormErrors({ ...formErrors, subject: ''});
  }

  const handleChangeZipCode = () => {
    if (formErrors.zipCode) setFormErrors({ ...formErrors, zipCode: ''});
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    const formData = new FormData(e.target);
    setSubject(formData.get('subject'));
    setZipCode(formData.get('zip'));
    setStep(3);
  }
  
  return (
    <Form onSubmit={handleNext}>
      <Form.Group className="mb-2" controlId="subject">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" placeholder="Art" name="subject" ref={subjectInputRef} onChange={handleChangeSubject}></Form.Control>
        {formErrors.subject &&
          <Form.Text className="text-danger">{formErrors.subject}</Form.Text>
        }
      </Form.Group>

      <Form.Group className="mb-1" controlId="zipCode">
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type="number" placeholder="97214" name="zip" ref={zipCodeInputRef} onChange={handleChangeZipCode} onBlur={handleEnterZipCode}></Form.Control>
        {formErrors.zipCode &&
          <Form.Text className="text-danger">{formErrors.zipCode}</Form.Text>
        }
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