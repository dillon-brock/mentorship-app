import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { updateSubject } from "../../services/subjects";
import styles from './subjectTab.module.css';

export default function SubjectTab({ id, minPrice, maxPrice, lessonType, setTeacher, displayOnly }) {
  const [editing, setEditing] = useState(false);
  const [minPriceFromInput, setMinPriceFromInput] = useState(minPrice);
  const [maxPriceFromInput, setMaxPriceFromInput] = useState(maxPrice);
  const [lessonTypeFromInput, setLessonTypeFromInput] = useState(lessonType);
  const [showEditButton, setShowEditButton] = useState(false);

  const handleUpdateSubject = async () => {
    const updatedSubject = await updateSubject({
      id,
      minPrice: minPriceFromInput,
      maxPrice: maxPriceFromInput,
      lessonType: lessonTypeFromInput
    });
    console.log(updatedSubject);
    setTeacher(prev => ({
      ...prev,
      subjects: [
        ...prev.subjects.filter(subject => subject.id !== id),
        updatedSubject
    ]}))
    setEditing(false);
  }

  return (
    <div 
      className={styles.container} 
      onMouseEnter={() => setShowEditButton(true)} 
      onMouseLeave={() => setShowEditButton(false)}
    >
      <h6 className={styles.subtitle}>Lesson Format</h6>
      {editing && !displayOnly ? 
        <Form.Select
          className={styles.input}
          defaultValue={lessonType} 
          onChange={(e) => setLessonTypeFromInput(e.target.value)}
        >
          <option value="Remote">Remote</option>
          <option value="In person">In person</option>
          <option value="Any">Any</option>
        </Form.Select>
        :
        <p>{lessonType}</p>
      }
      <h6 className={styles.subtitle}>Price</h6>
      {editing && !displayOnly ? 
        <Container className={styles.priceInputsContainer}>
          <Container className={styles.priceContainer}>
            <p className={styles.currency}>$</p>
            <Form.Control 
              className={styles.input} 
              type="number" 
              value={minPriceFromInput} 
              onChange={(e) => setMinPriceFromInput(e.target.value)} 
            />
          </Container>
          <p className={styles.currency}>to</p>
          <Container className={styles.maxPriceContainer}>
            <p className={styles.currency}>$</p>
            <Form.Control 
              className={styles.input} 
              type="number" 
              value={maxPriceFromInput} 
              onChange={(e) => setMaxPriceFromInput(e.target.value)} 
            />
          </Container>
        </Container>
        :
        <p>${minPrice} to ${maxPrice}</p>
      }
      {!editing && !displayOnly && showEditButton &&
        <Button className={styles.editButton} onClick={() => setEditing(true)}>
          <FaEdit />
        </Button>
      }
      {editing && !displayOnly &&
        <div className={styles.buttonContainer}>
          <Button className={styles.saveButton} onClick={handleUpdateSubject}>Save Changes</Button>
        </div>
      }
    </div>
  )
}