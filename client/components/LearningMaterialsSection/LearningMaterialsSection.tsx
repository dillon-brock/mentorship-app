import { useState } from "react";
import { Button, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from './learningMaterialsSection.module.css';
import TeachingMaterial from "../../../server/models/TeachingMaterial";
import ExpandButton from "../ExpandButton/ExpandButton";

type Props = {
  id: string;
  firstName: string;
  lastName: string;
  teachingMaterials: TeachingMaterial[];
}

export default function LearningMaterialsSection({ id, firstName, lastName, teachingMaterials }: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);
  const files: TeachingMaterial[] = teachingMaterials.filter(material => material.type === 'file');
  const links: TeachingMaterial[] = teachingMaterials.filter(material => material.type === 'link');

  return (
      <section className={styles.section}>
        <div className={styles.titleContainer}>
          <h3 className={styles.name}>{firstName} {lastName}</h3>
          <div className={styles.right}>
            <div className={styles.buttonContainer}>
              <Button className={styles.messageButton}>Message</Button>
              <Link to={`/teacher/${id}`}>
                <Button className={styles.profileButton}>View Profile</Button>  
              </Link>
            </div>
            <ExpandButton 
              expanded={expanded} 
              setExpanded={setExpanded} />
          </div>
        </div>
        <hr className={styles.hr} />
        {expanded &&
        <div className={styles.content}>
          <h4 className={styles.subtitle}>Files</h4>
          {files.length > 0 ?
            <Row className={styles.filesContainer}>
              {files.map(file => (
                <div key={file.id} className={styles.fileContainer}>
                  <a href={file.url} key={file.url} target="_blank">
                    <div className={styles.fileImageContainer}>
                      <Image className={styles.fileImage} src={`${file.url.slice(0, -3)}png`} rounded/>
                    </div>
                    {file.name && <p className={styles.fileName}>{file.name}</p>}
                  </a>
                </div>
              ))}
            </Row>
            :
            <h5 className={styles.noContent}>{firstName} has not uploaded any files.</h5>
          }
          <h4 className={styles.subtitle}>Links</h4>
          {links.length ? 
          <>
            {links.map(link => (
              <div key={link.id} className={styles.linkContainer}>
                <a href={link.url}>{link.name ? link.name : link.url}</a>
              </div>
            ))}
          </>
            :
            <h5 className={styles.subtitle}>{firstName} has not uploaded any links.</h5>
          }
        </div>
        }
      </section>
  )
}