import { Button, Col, Container, Image } from "react-bootstrap";
import styles from './approvedStudent.module.css';

export default function ApprovedStudent({ imageUrl, firstName, lastName, subject, handleMessage }) {
  
  return (
    <div>
      <Container className="d-flex align-items-center justify-content-center" style={{ color: 'black', height: '180px', width: '640px' }}>
        <Col className="d-flex align-items-center justify-content-center">
          <Image src={imageUrl} style={{ width: '130px', height: '130px' }} />
        </Col>
        <Col>
          <p className={styles.name}>{`${firstName} ${lastName}`}</p>
          <p>{subject}</p>
        </Col>
        <Col className={styles.buttonContainer}>
          <Button className={styles.messageButton} onClick={handleMessage}>Message</Button>
        </Col>
      </Container>
      <hr style={{ height: '1px', width: '60%', margin: '0 auto' }} />
    </div>
  )
}