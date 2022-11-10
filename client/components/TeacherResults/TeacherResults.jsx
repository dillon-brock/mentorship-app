import { useAllTeachers } from "../../hooks/useAllTeachers";
import TeacherResult from "../TeacherResult/TeacherResult";

export default function TeacherResults({ subject }) {
  const { teachers } = useAllTeachers(subject);
  console.log(teachers);

  return (
    <>
      {teachers.map(teacher => <TeacherResult key={teacher.id} {...teacher} />)}
    </>
  )
}