import { Dispatch, SetStateAction, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { updateSubject } from "../../services/subjects/subjects";
import styles from './subjectTab.module.css';
import { Subject, Teacher } from "../../types";

type Props = {
  id: string;
  minPrice: number;
  maxPrice: number;
  lessonType: string;
  setTeacher?: Dispatch<SetStateAction<Teacher>>;
  displayOnly: boolean;
}

export default function SubjectTab({ id, minPrice, maxPrice, lessonType, setTeacher, displayOnly }: Props) {
  const [editing, setEditing] = useState<boolean>(false);
  const [minPriceFromInput, setMinPriceFromInput] = useState<number>(minPrice);
  const [maxPriceFromInput, setMaxPriceFromInput] = useState<number>(maxPrice);
  const [lessonTypeFromInput, setLessonTypeFromInput] = useState<string>(lessonType);
  const [showEditButton, setShowEditButton] = useState<boolean>(false);

  const handleUpdateSubject = async () => {
    const updatedSubject: Subject = await updateSubject({
      id,
      minPrice: minPriceFromInput,
      maxPrice: maxPriceFromInput,
      lessonType: lessonTypeFromInput
    });
    (setTeacher as Dispatch<SetStateAction<Teacher>>)(prev => ({
      ...prev,
      subjects: [
        ...(prev.subjects?.filter(subject => subject.id !== id) as Subject[]),
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
              onChange={(e) => setMinPriceFromInput(Number(e.target.value))} 
            />
          </Container>
          <p className={styles.currency}>to</p>
          <Container className={styles.maxPriceContainer}>
            <p className={styles.currency}>$</p>
            <Form.Control 
              className={styles.input} 
              type="number" 
              value={maxPriceFromInput} 
              onChange={(e) => setMaxPriceFromInput(Number(e.target.value))} 
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
      {editing && !displayOnly && setTeacher &&
        <div className={styles.buttonContainer}>
          <Button className={styles.saveButton} onClick={handleUpdateSubject}>Save Changes</Button>
        </div>
      }
    </div>
  )
}