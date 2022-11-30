import { useState } from "react"
import { Image } from "react-bootstrap";

export default function TeachingMaterialsSubjectSection({ subject, teachingMaterials }) {
  const [files, setFiles] = useState(teachingMaterials.filter(material => material.type === 'file'));
  const [links, setLinks] = useState(teachingMaterials.filter(material => material.type === 'link'));
  return (
    <section>
      <h3>Uploaded Files</h3>
      {files.map(file => (
        <div>
          <a href={file.url} target="_blank">
            <Image src={file.url} rounded/>
            {file.name && <p>{file.name}</p>}
          </a>
        </div>
      ))}
      <h3>Links</h3>
        <ul>
          {links.map(link => {
            if (link.name) return <a href={link.url} target="_blank">{link.name}</a>
            return <a href={link.url} target="_blank" />
          })}
        </ul>
    </section>
  )
}