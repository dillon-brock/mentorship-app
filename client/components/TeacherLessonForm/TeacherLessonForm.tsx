import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button, Form } from "react-bootstrap";
import SubjectInputs from "../SubjectInputs/SubjectInputs";
import styles from './teacherLessonForm.module.css';
import { LessonFormErrors, NumberedSubject } from "../../types";

type Props = {
  setSubjects: Dispatch<SetStateAction<NumberedSubject[]>>;
  setStep: Dispatch<SetStateAction<number>>;
  newUser: boolean;
}

export default function TeacherLessonForm({ setSubjects, setStep, newUser }: Props) {

  const [formErrors, setFormErrors] = useState<LessonFormErrors>({});
  const [subjectNums, setSubjectNums] = useState<number[]>([1]);
  let subjectFormData: NumberedSubject[] = [];

  const areSubjectsInvalid = (formData: FormData) => {
    let invalid: boolean = false;
    for (const num of subjectNums) {
      if (!formData.get(`subject-${num}`)) {
        setFormErrors({ 
          ...formErrors, 
          subject: { 
            num, 
            message: 'Subject is required.'
        }});
        invalid = true;
        return invalid;
      }
      
      if (!formData.get(`minPrice-${num}`)) {
        setFormErrors({ 
          ...formErrors, 
          minPrice: { 
            num, 
            message: 'Minimum price is required.'
        }});
        invalid = true;
        return invalid;
      }
      
      if (!formData.get(`maxPrice-${num}`)) {
        setFormErrors({ 
          ...formErrors, 
          maxPrice: {
            num, 
            message: 'Maximum price is required.'
        }});
        invalid = true;
        return invalid;
      }
      
      if (!formData.get(`lessonType-${num}`)) {
        setFormErrors({ 
          ...formErrors, 
          lessonType: { 
            num,
            message: 'Please select a lesson format.'
        }});
        invalid = true;
        return invalid;
      }
    }
    return invalid;
  }

  const handleNext = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if (areSubjectsInvalid(formData)) return;
    for (const num of subjectNums) {
      subjectFormData.push({
        num,
        subject: formData.get(`subject-${num}`) as string,
        minPrice: Number(formData.get(`minPrice-${num}`)),
        maxPrice: Number(formData.get(`maxPrice-${num}`)),
        lessonType: formData.get(`lessonType-${num}`) as string
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
    setSubjectNums(prev => [...prev, (prev[prev.length - 1] as number) + 1]);
  }
  
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>What do you want to teach?</h3>
      <Form className={styles.form} onSubmit={handleNext}>

        {subjectNums.map((num) => (
          <SubjectInputs 
            key={num} 
            num={num} 
            subjectNums={subjectNums} 
            setSubjectNums={setSubjectNums} 
            formErrors={formErrors} 
            setFormErrors={setFormErrors} 
          />
        ))}

        <Button className={styles.addButton} onClick={handleAddSubject}>+ Add Another Subject</Button>

        <div className={styles.nextButtonContainer}>
          <Button className={styles.nextButton} type="submit">Next</Button>
          {newUser ?
            <p className={styles.stepDisplay}>Step 2 of 3</p>
            :
            <p className={styles.stepDisplay}>Step 1 of 2</p>
          }
        </div>
      </Form>
    </div>
  );
}