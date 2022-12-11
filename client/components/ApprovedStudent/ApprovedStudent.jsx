import { useState } from "react";
import { Button, Col, Container, Image } from "react-bootstrap";
import RemoveStudentModal from "../RemoveStudentModal/RemoveStudentModal";
import styles from './approvedStudent.module.css';

export default function ApprovedStudent({ id, imageUrl, firstName, lastName, subject, connectionId, subjectId, setApprovedStudents, handleMessage }) {
  
  const [userWantsToRemoveStudent, setUserWantsToRemoveStudent] = useState(false);

  return (
    <>
      <div>
        <Container className="d-flex align-items-center justify-content-center" style={{ color: 'black', height: '180px', width: '640px' }}>
          <Col className="d-flex align-items-center justify-content-center">
            <Image src={imageUrl} style={{ width: '130px', height: '130px' }} />
          </Col>
          <Col className={styles.infoContainer}>
            <div className={styles.info}>
              <p className={styles.name}>{`${firstName} ${lastName}`}</p>
              <p className={styles.subject}>{subject}</p>
            </div>
          </Col>
          <Col className={styles.buttonContainer}>
            <Button className={styles.messageButton} onClick={handleMessage}>Message</Button>
            <Button onClick={() => setUserWantsToRemoveStudent(true)}>Remove</Button>
          </Col>
        </Container>
        <hr style={{ height: '1px', width: '60%', margin: '0 auto' }} />
      </div>
      <RemoveStudentModal 
        id={id} 
        firstName={firstName}
        connectionId={connectionId}
        setApprovedStudents={setApprovedStudents}
        subjectId={subjectId}
        userWantsToRemoveStudent={userWantsToRemoveStudent}
        setUserWantsToRemoveStudent={setUserWantsToRemoveStudent}
      />
    </>
  )
}