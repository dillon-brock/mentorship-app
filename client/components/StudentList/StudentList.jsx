import { useUserContext } from "../../context/UserContext.js";
import { useStudents } from "../../hooks/useStudents.js";
import { updateConnectionStatus } from "../../services/connection.js";
import ApprovedStudent from "../ApprovedStudent/ApprovedStudent.jsx";
import PendingStudent from "../PendingStudent/PendingStudent.jsx";

export default function StudentList() {
  const { user } = useUserContext();
  const { pendingStudents, setPendingStudents, approvedStudents, setApprovedStudents } = useStudents(user.teacherId);

  const handleApprove = async (id) => {
    await updateConnectionStatus({ teacherId: user.teacherId, studentId: id, connectionStatus: 'approved' });
    const updatedStudent = pendingStudents.find(s => s.id === id);
    setPendingStudents(prev => prev.filter(s => s.id !== id));
    setApprovedStudents(prev => [...prev, updatedStudent]);
  }

  const handleDeny = async (id) => {
    await updateConnectionStatus({ teacherId: user.teacherId, studentId: id, connectionStatus: 'rejected' });
    setPendingStudents(prev => prev.filter(s => s.id !== id));
  }

  return (
    <>
    {pendingStudents.length > 0 &&
      <>
        <p>Pending:</p>
        {pendingStudents.map(student => (
          <PendingStudent
            key={student.id}
            {...student} 
            handleApprove={handleApprove} 
            handleDeny={handleDeny}
          />
        ))}
      </>
    }
      <p>Current Students:</p>
      {approvedStudents.map(student => <ApprovedStudent key={student.id} {...student} />)};
    </>
  )
}