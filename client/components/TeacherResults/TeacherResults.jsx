import { Container } from "react-bootstrap";
import TeacherResult from "../TeacherResult/TeacherResult";

export default function TeacherResults({ teachers }) {
  
  if (!teachers.length)
    return <p>No teachers were found matching your criteria. Please try searching for a different subject or expand your radius.</p>

  return (
    <Container>
      {teachers.map(teacher => <TeacherResult key={teacher.id} {...teacher} />)}
    </Container>
  )
}