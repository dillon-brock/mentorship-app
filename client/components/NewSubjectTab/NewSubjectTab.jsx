import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { addSubject } from "../../services/subjects";
import styles from './newSubjectTab.module.css';

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
    <Form className={styles.form} onSubmit={handleAddSubject}>
      <Form.Group className="mb-2" controlId="subject">
        <Form.Label className={styles.label}>Subject</Form.Label>
        <Form.Control 
          className={styles.input} 
          type="text" 
          placeholder="Art" 
          name="subject" 
          onChange={handleChangeSubject} 
        />
        {formErrors.subject &&
          <Form.Text className="text-danger">{formErrors.subject}</Form.Text>
        }
      </Form.Group>

      <Form.Group className="mb-2" controlId="cost">
        <Form.Label className={styles.label}>Price</Form.Label>
        <Container className={styles.priceInputsContainer}>
          <Container className={styles.minPriceContainer}>
            <p className={styles.currency}>$</p>
            <Form.Control 
              className={styles.priceInput} 
              type="number" 
              name="minPrice" 
              placeholder="0" 
              onChange={handleChangeMinPrice} 
            />
          </Container>
          <p className={styles.currency}>to</p>
          <Container className={styles.maxPriceContainer}>
            <p className={styles.currency}>$</p>
            <Form.Control 
              className={styles.priceInput} 
              type="number" 
              name="maxPrice" 
              placeholder="100" 
              onChange={handleChangeMaxPrice} 
            />
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
        <Form.Label className={styles.label}>Lesson Format</Form.Label>
        <Form.Select className={styles.input} onChange={handleChangeLessonType} name="lessonType">
          <option value="In person">In person</option>
          <option value="Remote">Remote</option>
          <option value="Any">Any</option>
        </Form.Select>
        {formErrors.lessonType &&
          <Form.Text className="text-danger">{formErrors.lessonType}</Form.Text>
        }
      </Form.Group>
      <div className={styles.buttonContainer}>
        <Button className={styles.button} type="submit">+ Add Subject</Button>
      </div>
    </Form>
  )
}