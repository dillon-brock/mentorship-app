import { Button, Col, Container, Image } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext";
import { updateConnectionStatus } from "../../services/connection.js";

export default function PendingStudent({ id, imageUrl, firstName, lastName, handleApproveConnection }) {

  const { user } = useUserContext();

  return (
    <Container className="border d-flex align-items-center justify-content-center" style={{ color: 'black', height: '180px', width: '640px' }}>
      <Col className="d-flex align-items-center justify-content-center">
        <Image roundedCircle src={imageUrl} style={{ width: '120px', height: '120px' }} />
      </Col>
      <Col>
        <p>{`${firstName} ${lastName}`}</p>
      </Col>
      <Col className="d-flex align-items-center justify-content-end">
        <Button onClick={() => handleApproveConnection(id)}>Add Student</Button>
        <Button>Deny</Button>
      </Col>
    </Container>
  )
}