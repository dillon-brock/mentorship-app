import { Col, Nav, Row, Tab, Tabs } from "react-bootstrap";
import NewSubjectTab from "../NewSubjectTab/NewSubjectTab";
import SubjectTabContent from "../SubjectTabContent/SubjectTabContent";

export default function SubjectList({ subjects, setTeacher }) {
  console.log(subjects);
  return (
    <>
      <h4>Subjects</h4>
      <Tab.Container defaultActiveKey={subjects[0].subject}>
          <Row>
          <Row md={3}>
            <Nav variant="tabs">
              {subjects.map((subject, i) => (
                <Nav.Item key={subject.id}>
                  <Nav.Link eventKey={subject.subject}>{subject.subject}</Nav.Link>
                </Nav.Item>
              ))}
              <Nav.Item>
                <Nav.Link eventKey="new">+</Nav.Link>
              </Nav.Item>
            </Nav>
          </Row>
          <Col sm={9}>
            <Tab.Content>
              {subjects.map((subject, i) => (
                <Tab.Pane key={subject.id} eventKey={subject.subject}>
                  <SubjectTabContent {...subject} i={i} setTeacher={setTeacher} />
                </Tab.Pane>
              ))}
              <Tab.Pane eventKey="new">
                <NewSubjectTab />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}