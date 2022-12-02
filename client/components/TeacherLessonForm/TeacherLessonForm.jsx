import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import SubjectInputs from "../SubjectInputs/SubjectInputs";

export default function TeacherLessonForm({ setSubjects, setStep, newUser }) {

  const [formErrors, setFormErrors] = useState({});
  const [subjectNums, setSubjectNums] = useState([1]);
  let subjectFormData = [];

  const areSubjectsInvalid = (formData) => {
    let invalid = false;
    for (const num of subjectNums) {
      if (!formData.get(`subject-${num}`)) {
        setFormErrors({ ...formErrors, subject: { num, message: 'Subject is required.'}});
        invalid = true;
        return invalid;
      }
      
      if (!formData.get(`minPrice-${num}`)) {
        setFormErrors({ ...formErrors, minPrice: { num, message: 'Minimum price is required.'}});
        invalid = true;
        return invalid;
      }
      
      if (!formData.get(`maxPrice-${num}`)) {
        setFormErrors({ ...formErrors, maxPrice: { num, message: 'Maximum price is required.'}});
        invalid = true;
        return invalid;
      }
      
      if (!formData.get(`lessonType-${num}`)) {
        setFormErrors({ ...formErrors, lessonType: { num, message: 'Please select a lesson format.'}});
        invalid = true;
        return invalid;
      }
    }
    return invalid;
  }

  const handleNext = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (areSubjectsInvalid(formData)) return;
    for (const num of subjectNums) {
      subjectFormData.push({
        num,
        subject: formData.get(`subject-${num}`),
        minPrice: Number(formData.get(`minPrice-${num}`)),
        maxPrice: Number(formData.get(`maxPrice-${num}`)),
        lessonType: formData.get(`lessonType-${num}`)
      })
    }
    setSubjects(subjectFormData);
    if (!newUser) {
      setStep(2);
      return;
    }
    setStep(3);
  }

  const handleAddSubject = () => {
    setSubjectNums(prev => [...prev, prev[prev.length - 1] + 1]);
  }
  
  return (
    <Form onSubmit={handleNext}>

      {subjectNums.map((num) => <SubjectInputs key={num} num={num} setSubjectNums={setSubjectNums} formErrors={formErrors} setFormErrors={setFormErrors} />)}

      <Button variant="outline-primary" onClick={handleAddSubject}>+ Add Another Subject</Button>

      <Button type="submit">Next</Button>
    </Form>
  );
}