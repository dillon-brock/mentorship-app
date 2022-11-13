import { Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TeacherResult({ id, firstName, lastName, zipCode, subject, imageUrl, city, state }) {
  
  return (
    <Link to={`/teacher/${id}`} style={{ textDecoration: 'none' }}>
      <Container className="border d-flex align-items-center justify-content-center" style={{ color: 'black', height: '180px', width: '640px' }}>
        <Col className="d-flex align-items-center justify-content-center">
          <Image roundedCircle src={imageUrl} style={{ width: '120px', height: '120px' }} />
        </Col>
        <Col>
          <Container>
            <Row>
              <p>{`${firstName} ${lastName}`}</p>
            </Row>
            <Row>
              {city && state ?
                <p>{`${subject} | ${city}, ${state}`}</p>
                :
                <p>{`${subject} | ${zipCode}`}</p>
              }
            </Row>
          </Container>
        </Col>
        <Col className="d-flex align-items-center justify-content-end">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </Col>
      </Container>
    </Link>
  )
}