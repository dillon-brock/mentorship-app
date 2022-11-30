import { useState } from "react"
import { Image } from "react-bootstrap";

export default function TeachingMaterialsSubjectSection({ subject, teachingMaterials }) {
  const files = teachingMaterials.filter(material => material.type === 'file');
  const links = teachingMaterials.filter(material => material.type === 'link');
  return (
    <section>
      <h3>Uploaded Files</h3>
      {files.length > 0 ?
      <>
        {files.map(file => (
          <div>
            <a href={file.url} target="_blank">
              <Image src={file.url} rounded/>
              {file.name && <p>{file.name}</p>}
            </a>
          </div>
        ))}
      </>
      :
      <>
        <h4>{`You currently have no uploaded files for the subject ${subject}.`}</h4>
      </>
      }
      <h3>Links</h3>
      {links.length > 0 ?
        <ul>
          {links.map(link => {
            if (link.name) return <a href={link.url} target="_blank">{link.name}</a>
            return <a href={link.url} target="_blank" />
          })}
        </ul>
        :
        <h4>{`You currently have no links for the subject ${subject}.`}</h4>
      }
    </section>
  )
}