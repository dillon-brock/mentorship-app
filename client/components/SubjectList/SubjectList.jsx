import { Col, Nav, Row, Tab, Tabs } from "react-bootstrap";
import NewSubjectTab from "../NewSubjectTab/NewSubjectTab";
import SubjectTab from "../SubjectTab/SubjectTab";
import styles from './subjectList.module.css';

export default function SubjectList({ subjects, setTeacher, displayOnly }) {
  return (
    <>
      <h4 className={styles.title}>Subjects</h4>
      <Tab.Container defaultActiveKey={subjects[0].subject}>
          <Row>
          <Row md={3}>
            <Nav variant="tabs">
              {subjects.map((subject, i) => (
                <Nav.Item key={subject.id}>
                  <Nav.Link className={styles.navLink} eventKey={subject.subject}>{subject.subject}</Nav.Link>
                </Nav.Item>
              ))}
              {!displayOnly &&
                <Nav.Item>
                  <Nav.Link eventKey="add-new">+</Nav.Link>
                </Nav.Item>
              }
            </Nav>
          </Row>
          <Col sm={9}>
            <Tab.Content>
              {subjects.map((subject, i) => (
                <Tab.Pane key={subject.id} eventKey={subject.subject}>
                  <SubjectTab {...subject} i={i} setTeacher={setTeacher} displayOnly={displayOnly} />
                </Tab.Pane>
              ))}
              {!displayOnly &&
                <Tab.Pane eventKey="add-new">
                  <NewSubjectTab setTeacher={setTeacher} />
                </Tab.Pane>
              }
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </>
  )
}