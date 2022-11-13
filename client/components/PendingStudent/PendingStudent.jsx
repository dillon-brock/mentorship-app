import { Button, Col, Container, Image } from "react-bootstrap";

export default function PendingStudent({ id, imageUrl, firstName, lastName }) {

  return (
    <Container className="border d-flex align-items-center justify-content-center" style={{ color: 'black', height: '180px', width: '640px' }}>
      <Col className="d-flex align-items-center justify-content-center">
        <Image roundedCircle src={imageUrl} style={{ width: '120px', height: '120px' }} />
      </Col>
      <Col>
        <p>{`${firstName} ${lastName}`}</p>
      </Col>
      <Col className="d-flex align-items-center justify-content-end">
        <Button>Add Student</Button>
      </Col>
    </Container>
  )
}