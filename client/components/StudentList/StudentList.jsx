import { useUserContext } from "../../context/UserContext.js";
import { useStudents } from "../../hooks/useStudents.js";
import ApprovedStudent from "../ApprovedStudent/ApprovedStudent.jsx";
import PendingStudent from "../PendingStudent/PendingStudent.jsx";

export default function StudentList() {
  const { user } = useUserContext();
  const { pendingStudents, setPendingStudents, approvedStudents, setApprovedStudents } = useStudents(user.teacherId);

  const handleApproveConnection = async (id) => {
    await updateConnectionStatus({ teacherId: user.teacherId, studentId: id, connectionStatus: 'approved' });
    const updatedStudent = pendingStudents.find(s => s.id === id);
    setPendingStudents(prev => prev.filter(s => s.id !== id));
    setApprovedStudents(prev => [...prev, updatedStudent]);
  }

  return (
    <>
      <p>Pending:</p>
      {pendingStudents.map(student => <PendingStudent {...student} handleApproveConnection={handleApproveConnection} />)}
      <p>Current Students:</p>
      {approvedStudents.map(student => <ApprovedStudent {...student} />)};
    </>
  )
}