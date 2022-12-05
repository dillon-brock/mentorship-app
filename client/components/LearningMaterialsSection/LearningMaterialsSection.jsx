import { useState } from "react";
import { Accordion, Button, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LearningMaterialsSection({ i, id, imageUrl, firstName, lastName, teachingMaterials, handleMessage }) {
  const [expanded, setExpanded] = useState(false);
  const files = teachingMaterials.filter(material => material.type === 'file');
  const links = teachingMaterials.filter(material => material.type === 'link');

  return (
      <section>
        <div>
          <h3>{firstName} {lastName}</h3>
        </div>
        <h4>Files</h4>
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
        <h4>Links</h4>
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
      </section>
  )
}