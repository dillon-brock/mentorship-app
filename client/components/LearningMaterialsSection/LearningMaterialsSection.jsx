import { Accordion, Button, Container, Image } from "react-bootstrap";

export default function LearningMaterialsSection({ i, imageUrl, firstName, lastName, teachingMaterials }) {
  const files = teachingMaterials.filter(material => material.type === 'file');
  const links = teachingMaterials.filter(material => material.type === 'link');

  return (
    <Accordion.Item eventKey={i.toString()}>
      <Accordion.Header>
        <Container className="d-flex align-items-center justify-content-start">
          <Image roundedCircle src={imageUrl} style={{ width: '120px', height: '120px' }} />
          <h3 style={{ display: "inline-block", width: "200px"}}>{firstName} {lastName}</h3>
          <Container className="d-flex align-items-center justify-content-end">
            <Button>View Profile</Button>
            <Button>Message</Button>
          </Container>
        </Container>
      </Accordion.Header>
      <Accordion.Body>
        <h3>Files</h3>
        <>
          {files.map(file => (
            <div>
              <a href={file.url} key={file.url} target="_blank">
                <Image src={`${file.url.slice(0, -3)}png`} rounded/>
                {file.name && <p>{file.name}</p>}
              </a>
            </div>
          ))}
        </>
        <h3>Links</h3>
        {links.length ? 
          <ul>
            {links.map(link => {
              if (link.name) return <a href={link.url} key={link.url} target="_blank">{link.name}</a>
              return <a href={link.url} target="_blank" />
            })}
          </ul>
          :
          <h4>{firstName} has not uploaded any links.</h4>
        }
      </Accordion.Body>
    </Accordion.Item>
  )
}