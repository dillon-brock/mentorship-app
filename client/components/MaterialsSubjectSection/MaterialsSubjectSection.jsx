import { useState } from "react";
import { Button, Row } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import FileMaterial from "../FileMaterial/FileMaterial";
import LinkMaterial from "../LinkMaterial/LinkMaterial";
import styles from './materialSubjectSection.module.css';

export default function MaterialsSubjectSection({ subject, teachingMaterials, setTeachingMaterials, subjects }) {
  const files = teachingMaterials.filter(material => material.type === 'file' && material.subjectId == subject.id );
  const links = teachingMaterials.filter(material => material.type === 'link' && material.subjectId == subject.id );
  const [expanded, setExpanded] = useState(false);

  return (
    <section className={styles.section}>
      <div className={styles.titleContainer}>
        <h3>{subject.subject}</h3>
        {expanded ?
          <Button className={styles.chevronButton} onClick={() => setExpanded(false)}>
            <FaChevronUp />
          </Button>
          :
          <Button className={styles.chevronButton} onClick={() => setExpanded(true)}>
            <FaChevronDown />
          </Button>
        }
      </div>
      <hr className={styles.hr} />
      {expanded &&
      <>
      <div className={styles.content}>
        <h4 className={styles.subtitle}>Files</h4>
        {files.length > 0 ?
          <Row className={styles.filesContainer}>
            {files.map(file => (
              <FileMaterial key={file.id} {...file} setTeachingMaterials={setTeachingMaterials} subjects={subjects} />
            ))}
          </Row>
        :
        <>
          <h5 className={styles.noContent}>You currently have no uploaded files.</h5>
        </>
        }
        <h4 className={styles.subtitle}>Links</h4>
        {links.length > 0 ?
          <ul>
            {links.map(link => <LinkMaterial key={link.id} {...link} setTeachingMaterials={setTeachingMaterials} subjects={subjects} />)}
          </ul>
          :
          <h5 className={styles.noContent}>You currently have no saved links.</h5>
        }
      </div>
      </>
      }
    </section>
  )
}