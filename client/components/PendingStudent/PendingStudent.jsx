import { Button, Col, Container, Image } from "react-bootstrap";
import styles from './pendingStudent.module.css';

export default function PendingStudent({ id, imageUrl, firstName, lastName, subject, handleApprove, handleDeny, handleMessage }) {
  
  return (
    <div>
      <Container className="d-flex align-items-center justify-content-center" style={{ color: 'black', height: '180px', width: '640px' }}>
          <Col className="d-flex align-items-center justify-content-center">
            <Image src={imageUrl} style={{ width: '130px', height: '130px' }} />
          </Col>
          <Col className={styles.infoContainer}>
            <div className={styles.info}>
              <p className={styles.name}>{`${firstName} ${lastName}`}</p>
              <p className={styles.subject}>{subject}</p>
              <Button className={styles.messageButton} onClick={handleMessage}>Message</Button>
            </div>
          </Col>
          <Col className={styles.actionButtonContainer}>
            <Button className={styles.approveButton} onClick={() => handleApprove(id)}>Add</Button>
            <Button className={styles.denyButton} onClick={() => handleDeny(id)}>Deny</Button>
          </Col>
        </Container>
        <hr style={{ height: '1px', width: '60%', margin: '0 auto' }}/>
    </div>
    )
}