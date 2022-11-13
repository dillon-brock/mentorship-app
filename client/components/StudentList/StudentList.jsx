import { useUserContext } from "../../context/UserContext.js";
import { useStudents } from "../../hooks/useStudents.js";
import PendingStudent from "../PendingStudent/PendingStudent.jsx";

export default function StudentList() {
  const { user } = useUserContext();
  const { pendingStudents, setPendingStudents, approvedStudents, setApprovedStudents } = useStudents(user.teacherId);
  return (
    <>
      <p>Pending:</p>
      {pendingStudents.map(student => <PendingStudent {...student} />)}
      <p>Current Students:</p>
      {approvedStudents.map(student)}
    </>
  )
}