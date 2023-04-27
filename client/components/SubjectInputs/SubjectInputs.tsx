import { Button, Form, Row } from "react-bootstrap";

import styles from './subjectInputs.module.css';
import globalStyles from '../../global.module.css';
import { LessonFormErrors } from "../../types";
import { Dispatch, SetStateAction } from "react";

type Props = {
  num: number;
  formErrors: LessonFormErrors;
  setFormErrors: Dispatch<SetStateAction<LessonFormErrors>>;
  subjectNums: number[];
  setSubjectNums: Dispatch<SetStateAction<number[]>>;
}

export default function SubjectInputs({ num, formErrors, setFormErrors, subjectNums, setSubjectNums }: Props) {

  let displayNum = subjectNums.indexOf(num) + 1;

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
    <div className={styles.container}>
      <h4 className={styles.subjectTitle}>Subject {displayNum}</h4>
      <Form.Group className="mb-2" controlId="subject">
        <Form.Label className={globalStyles.authFormLabel}>Subject</Form.Label>
        <Form.Control 
          className={styles.input} 
          type="text" 
          placeholder="Art" 
          name={`subject-${num}`} 
          onChange={handleChangeSubject} 
        />
        {formErrors.subject && formErrors.subject.num == num &&
          <Form.Text className="text-danger">{formErrors.subject.message}</Form.Text>
        }
      </Form.Group>

      <Row className={styles.priceInputs} xs={2}>
        <Form.Group className="mb-2" controlId="cost">
          <Form.Label className={styles.priceLabel}>Min Price</Form.Label>
          <div className={styles.priceInputContainer}>
            <p className={styles.currency}>$</p>
            <Form.Control 
              className={styles.input} 
              type="number" 
              placeholder="0" 
              name={`minPrice-${num}`} 
              onChange={handleChangeMinPrice}
            />
          </div>
          {formErrors.minPrice && formErrors.minPrice.num == num &&
            <Form.Text className="text-danger">{formErrors.minPrice.message}</Form.Text>
          }
          </Form.Group>
          <Form.Group>
            <Form.Label className={styles.priceLabel}>Max Price</Form.Label>
            <div className={styles.priceInputContainer}>
              <p className={styles.currency}>$</p>
              <Form.Control 
                className={styles.input} 
                type="number" 
                placeholder="0" 
                name={`maxPrice-${num}`} 
                onChange={handleChangeMaxPrice} 
              />
            </div>
            {formErrors.maxPrice && formErrors.maxPrice.num == num &&
              <Form.Text className="text-danger">{formErrors.maxPrice.message}</Form.Text>
            }
          </Form.Group>
      </Row>

      <Form.Group className="mb-2" controlId="lessonType">
        <Form.Select className={styles.input} name={`lessonType-${num}`} defaultValue='' onChange={handleChangeLessonType}>
          <option value='' disabled>Select a lesson format...</option>
          <option value="In person">In person</option>
          <option value="Remote">Remote</option>
          <option value="Any">Any</option>
        </Form.Select>
        {formErrors.lessonType && formErrors.lessonType.num == num &&
          <Form.Text className="text-danger">{formErrors.lessonType.message}</Form.Text>
        }
      </Form.Group>
      {subjectNums.length > 1 &&
        <Button className={styles.removeButton} onClick={handleRemove}>-</Button>
      }
    </div>
  )
}