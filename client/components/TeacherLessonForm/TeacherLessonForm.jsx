import { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import SubjectInputs from "../SubjectInputs/SubjectInputs";

export default function TeacherLessonForm({ setSubject, setZipCode, setStep }) {

  const subjectInputRef = useRef();
  const [formErrors, setFormErrors] = useState({});
  const [subjects, setSubjects] = useState([1]);

  console.log(subjects);

  console.log(formErrors);

  const isFormInvalid = () => {
    let invalid = false;
    
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

  const handleNext = async (e) => {
    e.preventDefault();
    if (isFormInvalid()) return;
    const formData = new FormData(e.target);
    setSubject(formData.get('subject'));
    setStep(3);
  }

  const handleAddSubject = () => {
    setSubjects(prev => [...prev, prev[prev.length - 1] + 1]);
  }
  
  return (
    <Form onSubmit={handleNext}>
      {/* <Form.Group className="mb-2" controlId="subject">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" placeholder="Art" name="subject" ref={subjectInputRef} onChange={handleChangeSubject}></Form.Control>
        {formErrors.subject &&
          <Form.Text className="text-danger">{formErrors.subject}</Form.Text>
        }
      </Form.Group> */}

      {subjects.map((num) => <SubjectInputs key={num} num={num} subjects={subjects} setSubjects={setSubjects} />)}
      <Button variant="outline-primary" onClick={handleAddSubject}>+ Add Another Subject</Button>


      <Button type="submit">Next</Button>
    </Form>
  );
}