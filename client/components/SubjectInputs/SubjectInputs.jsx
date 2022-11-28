import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function SubjectInputs({ num, formErrors, setFormErrors, setSubjectNums }) {

  const handleRemove = () => {
    setSubjectNums(prev => prev.filter(s => s !== num));
  }

  const handleChangeSubject = () => {
    if (formErrors.subject && formErrors.subject.num == num) {
      setFormErrors({ ...formErrors, subject: null});
    }
  }

  const handleChangeMinPrice = () => {
    if (formErrors.minPrice && formErrors.minPrice.num == num) {
      setFormErrors({ ...formErrors, minPrice: null });
    }
  }

  const handleChangeMaxPrice = () => {
    if (formErrors.maxPrice && formErrors.maxPrice.num == num) {
      setFormErrors({ ...formErrors, maxPrice: null });
    }
  }

  const handleChangeLessonType = () => {
    if (formErrors.lessonType && formErrors.lessonType.num == num) {
      setFormErrors({ ...formErrors, lessonType: null });
    }
  }

  return (
    <div>
      <Form.Group className="mb-2" controlId="subject">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" placeholder="Art" name={`subject-${num}`} onChange={handleChangeSubject} />
        {formErrors.subject && formErrors.subject.num == num &&
          <Form.Text className="text-danger">{formErrors.subject.message}</Form.Text>
        }
      </Form.Group>

      <Form.Group className="mb-2" controlId="cost">
        <Form.Label>Cost</Form.Label>
        <Form.Control type="number" placeholder="0" name={`minPrice-${num}`} onChange={handleChangeMinPrice}/>
        {formErrors.minPrice && formErrors.minPrice.num == num &&
          <Form.Text className="text-danger">{formErrors.minPrice.message}</Form.Text>
        }
        <p>to</p>
        <Form.Control type="number" placeholder="0" name={`maxPrice-${num}`} onChange={handleChangeMaxPrice} />
        {formErrors.maxPrice && formErrors.maxPrice.num == num &&
          <Form.Text className="text-danger">{formErrors.maxPrice.message}</Form.Text>
        }
      </Form.Group>

      <Form.Group className="mb-2" controlId="lessonType">
        <Form.Label>Lesson Format</Form.Label>
        <Form.Check name={`lessonType-${num}`} type="radio" label="In person" value="In person" onChange={handleChangeLessonType} />
        <Form.Check name={`lessonType-${num}`} type="radio" label="Remote" value="Remote" onChange={handleChangeLessonType} />
        <Form.Check name={`lessonType-${num}`} type="radio" label="Any" value="Any" onChange={handleChangeLessonType} />
        {formErrors.lessonType && formErrors.lessonType.num == num &&
          <Form.Text className="text-danger">{formErrors.lessonType.message}</Form.Text>
        }
      </Form.Group>
      <Button onClick={handleRemove}>Remove</Button>
    </div>
  )
}