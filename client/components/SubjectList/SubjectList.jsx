import { Col, Nav, Row, Tab, Tabs } from "react-bootstrap";
import SubjectTabContent from "../SubjectTabContent/SubjectTabContent";

export default function SubjectList({ subjects }) {
  return (
    <>
      <h4>Subjects</h4>
      <Tab.Container defaultActiveKey={subjects[0].subject}>
          <Row>
          <Row sm={3}>
            <Nav variant="tabs">
              {subjects.map((subject, i) => (
                <Nav.Item key={subject.id}>
                  <Nav.Link eventKey={subject.subject}>{subject.subject}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Row>
          <Col sm={9}>
            <Tab.Content>
              {subjects.map((subject, i) => (
                <Tab.Pane eventKey={subject.subject}>
                  <SubjectTabContent {...subject} i={i} />
                </Tab.Pane>
              ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}