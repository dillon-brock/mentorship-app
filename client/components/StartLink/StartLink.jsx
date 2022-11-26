import { Col, Container, Row } from 'react-bootstrap';

export default function StartLink({ type }) {
  let description;
  if (type === 'teach') {
    description = 'Create a public profile, upload teaching materials, and interact with your students.'
  }
  else if (type === 'learn') {
    description = 'Create a student account to message instructors and view their learning materials'
  }
  else {
    description = 'Search for instructors and view their profiles. You will need to create an account to interact with them.'
  }

  return (
    <Container className="border d-flex align-items-center justify-content-center" style={{ color: 'black', height: '180px', width: '100%' }}>
      <Col className="d-flex align-items-center justify-content-center">Image</Col>
      <Col>
        <Container>
          {type ?
            <Row>I want to {type}</Row>
            :
            <Row>Find Instructors</Row>
          }
          <Row>{description}</Row>
        </Container>
      </Col>
      <Col className="d-flex align-items-center justify-content-end">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </Col>
    </Container>
  );
}