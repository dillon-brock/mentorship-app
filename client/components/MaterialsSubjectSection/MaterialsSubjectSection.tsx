import { Dispatch, SetStateAction, useState } from "react";
import { Row } from "react-bootstrap";
import FileMaterial from "../FileMaterial/FileMaterial";
import LinkMaterial from "../LinkMaterial/LinkMaterial";
import styles from './materialSubjectSection.module.css';
import Subject from "../../../server/models/Subject";
import TeachingMaterial from "../../../server/models/TeachingMaterial";
import ExpandButton from "../ExpandButton/ExpandButton";

type Props = {
  subject: Subject;
  teachingMaterials: TeachingMaterial[];
  setTeachingMaterials: Dispatch<SetStateAction<TeachingMaterial[]>>;
  subjects: Subject[];
}

export default function MaterialsSubjectSection({ subject, teachingMaterials, setTeachingMaterials, subjects }: Props) {
  const files: TeachingMaterial[] = teachingMaterials.filter(material => material.type === 'file' && material.subjectId == subject.id && typeof material.name == 'string' );
  const links: TeachingMaterial[] = teachingMaterials.filter(material => material.type === 'link' && material.subjectId == subject.id );
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <section className={styles.section}>
      <div className={styles.titleContainer}>
        <h3 className={styles.sectionTitle}>{subject.subject}</h3>
        <ExpandButton expanded={expanded} setExpanded={setExpanded} />
      </div>
      <hr className={styles.hr} />
      {expanded &&
      <>
      <div className={styles.content}>
        <h4 className={styles.subtitle}>Files</h4>
        {files.length > 0 ?
          <Row className={styles.filesContainer}>
            {files.map(file => (
              <FileMaterial 
                key={file.id} 
                {...file}
                name={file.name != undefined ? file.name : ''}
                setTeachingMaterials={setTeachingMaterials} 
                subjects={subjects} 
              />
            ))}
          </Row>
        :
        <>
          <h5 className={styles.noContent}>You currently have no uploaded files.</h5>
        </>
        }
        <h4 className={styles.subtitle}>Links</h4>
        {links.length > 0 ?
          <ul className={styles.linkList}>
            {links.map(link => (
              <LinkMaterial 
                key={link.id} 
                {...link} 
                setTeachingMaterials={setTeachingMaterials} 
                subjects={subjects} 
              />
            ))}
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