import { Image } from "react-bootstrap";

import FileMaterial from "../FileMaterial/FileMaterial";
import LinkMaterial from "../LinkMaterial/LinkMaterial";

export default function MaterialsSubjectSection({ subject, teachingMaterials, setTeachingMaterials, subjects }) {
  const files = teachingMaterials.filter(material => material.type === 'file' && material.subjectId == subject.id );
  const links = teachingMaterials.filter(material => material.type === 'link' && material.subjectId == subject.id );
  console.log(subject);
  return (
    <section>
      <h3>{subject.subject}</h3>
      <h5>Uploaded Files</h5>
      {files.length > 0 ?
      <>
        {files.map(file => (
          <FileMaterial key={file.id} {...file} setTeachingMaterials={setTeachingMaterials} subjects={subjects} />
        ))}
      </>
      :
      <>
        <h6>{`You currently have no uploaded files for the subject ${subject.subject}.`}</h6>
      </>
      }
      <h5>Links</h5>
      {links.length > 0 ?
        <ul>
          {links.map(link => <LinkMaterial key={link.id} {...link} setTeachingMaterials={setTeachingMaterials} subjects={subjects} />)}
        </ul>
        :
        <h6>{`You currently have no links for the subject ${subject.subject}.`}</h6>
      }
    </section>
  )
}