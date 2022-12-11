import { useState } from "react";
import { useUserContext } from "../../context/UserContext.js";
import { useStudents } from "../../hooks/useStudents.js";
import { updateConnectionStatus } from "../../services/connection.js";
import ApprovedStudent from "../ApprovedStudent/ApprovedStudent.jsx";
import ChatWindow from "../ChatWindow/ChatWindow.jsx";
import NoStudentsDisplay from "../NoStudentsDisplay/NoStudentsDisplay.jsx";
import PendingStudent from "../PendingStudent/PendingStudent.jsx";
import loaderStyles from '../../loader.module.css';

import styles from './studentList.module.css';

export default function StudentList() {
  const { user } = useUserContext();
  const { pendingStudents, setPendingStudents, approvedStudents, setApprovedStudents, loading } = useStudents(user?.teacherId);
  const [openChatBox, setOpenChatBox] = useState(false);
  const [studentMessageRecipient, setStudentMessageRecipient] = useState(null);

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

  const handleMessage = (student) => {
    setStudentMessageRecipient(student);
    setOpenChatBox(true);
  }

  const handleCloseChatBox = () => {
    setOpenChatBox(false);
  }

  return (
    <>
      {loading ?
        <div className={styles.loaderContainer}>
          <div className={loaderStyles.loader}></div>
        </div>
        :
        <>
          {!pendingStudents.length && !approvedStudents.length ?
            <NoStudentsDisplay />
            :
            <section className={styles.container}>
              <h3 className={styles.sectionTitle}>Pending:</h3>
              {pendingStudents.length > 0 ?
                <div className={styles.sectionContainer}>
                  {pendingStudents.map(student => (
                    <PendingStudent
                      key={student.id}
                      {...student} 
                      handleApprove={handleApprove} 
                      handleDeny={handleDeny}
                      handleMessage={() => handleMessage(student)}
                    />
                  ))}
                </div>
                :
                <h4 className={styles.emptyMessage}>You have no pending requests.</h4>
              }
              <h3 className={styles.sectionTitle}>Current Students:</h3>
              {approvedStudents.length > 0 ?
                <div className={styles.sectionContainer}>
                  {approvedStudents.map(student => <ApprovedStudent key={student.id} {...student} handleMessage={() => handleMessage(student)} />)}
                </div>
                :
                <h4 className={styles.emptyMessage}>You have no current students.</h4>   
              }
              {openChatBox &&
                <ChatWindow primaryUser={user} secondaryUser={studentMessageRecipient} handleClose={handleCloseChatBox} />
              }
            </section>
          }
        </>
      }
    </>
  )
}