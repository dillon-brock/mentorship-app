import { Container } from "react-bootstrap";
import { useAllTeachers } from "../../hooks/useAllTeachers";
import TeacherResult from "../TeacherResult/TeacherResult";

export default function TeacherResults({ teachers, page, pageLength }) {

  return (
    <Container>
      {teachers.map(teacher => <TeacherResult key={teacher.id} {...teacher} />)}
    </Container>
  )
}