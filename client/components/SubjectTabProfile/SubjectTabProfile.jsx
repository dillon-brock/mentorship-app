import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { updateSubject } from "../../services/subjects";

export default function SubjectTabProfile({ id, minPrice, maxPrice, lessonType, setTeacher }) {
  const [editing, setEditing] = useState(false);
  const [minPriceFromInput, setMinPriceFromInput] = useState(minPrice);
  const [maxPriceFromInput, setMaxPriceFromInput] = useState(maxPrice);
  const [lessonTypeFromInput, setLessonTypeFromInput] = useState(lessonType);

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
    <div style={{ position: "relative", paddingTop: '10px', width: '300px'}}>
      <h6>Lesson Format</h6>
      {editing ? 
        <Form.Select defaultValue={lessonType} onChange={(e) => setLessonTypeFromInput(e.target.value)}>
          <option value="Remote">Remote</option>
          <option value="In person">In person</option>
          <option value="Any">Any</option>
        </Form.Select>
        :
        <p>{lessonType}</p>
      }
      <h6>Price</h6>
      {editing ? 
        <Container style={{ padding: '0', gap: '10px' }} className="d-flex align-items-center justify-content-start">
          <Container style={{ padding: '0' }} className="d-flex align-items-center justify-content-start">
            <p>$</p>
            <Form.Control type="number" value={minPriceFromInput} onChange={(e) => setMinPriceFromInput(e.target.value)} />
          </Container>
          <p>to</p>
          <Container style={{ padding: '0' }} className="d-flex align-items-center justify-content-end">
            <p>$</p>
            <Form.Control type="number" value={maxPriceFromInput} onChange={(e) => setMaxPriceFromInput(e.target.value)} />
          </Container>
        </Container>
        :
        <p>${minPrice} to ${maxPrice}</p>
      }
      {!editing &&
        <Button variant="light" style={{ position: "absolute", top: '10px', right: '10px' }} onClick={() => setEditing(true)}>
          <FaEdit />
        </Button>
      }
      {editing &&
        <Button onClick={handleUpdateSubject} style={{ marginTop: '12px' }}>Save Changes</Button>
      }
    </div>
  )
}