import { Accordion } from "react-bootstrap";

export default function LearningMaterialsSection({ i, imageUrl, firstName, lastName, teachingMaterials }) {
  const files = teachingMaterials.filter(material => material.type === 'file');
  const links = teachingMaterials.filter(material => material.type === 'link');

  return (
    <Accordion.Item eventKey={i.toString()}>
      <Accordion.Header>
        <Container className="d-flex align-items-center justify-content-start">
          <Image roundedCircle src={imageUrl} style={{ width: '120px', height: '120px' }} />
          <h3>{firstName} {lastName}</h3>
          <Container className="d-flex align-items-center justify-content end">
            <Button>View Profile</Button>
            <Button>Message</Button>
          </Container>
        </Container>
      </Accordion.Header>
      <Accordion.Body>
        
      </Accordion.Body>
    </Accordion.Item>
  )
}