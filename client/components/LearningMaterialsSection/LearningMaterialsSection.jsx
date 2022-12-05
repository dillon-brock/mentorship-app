import { useState } from "react";
import { Button, Container, Image, Row } from "react-bootstrap";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from './learningMaterialsSection.module.css';

export default function LearningMaterialsSection({ i, id, imageUrl, firstName, lastName, teachingMaterials, handleMessage }) {
  const [expanded, setExpanded] = useState(false);
  const files = teachingMaterials.filter(material => material.type === 'file');
  const links = teachingMaterials.filter(material => material.type === 'link');

  return (
      <section className={styles.section}>
        <div className={styles.titleContainer}>
          <h3>{firstName} {lastName}</h3>
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
        <div className={styles.content}>
          <h4 className={styles.subtitle}>Files</h4>
          {files.length > 0 ?
            <Row className={styles.filesContainer}>
              {files.map(file => (
                <div style={{ position: 'relative', display: 'flex', width: '275px', height: '360px', flexDirection: 'column', alignItems: 'center'}}>
                  <a href={file.url} key={file.url} target="_blank">
                    <div className={styles.fileImageContainer}>
                      <Image className={styles.fileImage} src={`${file.url.slice(0, -3)}png`} rounded/>
                    </div>
                    {file.name && <p>{file.name}</p>}
                  </a>
                </div>
              ))}
            </Row>
            :
            <h5 className={styles.noContent}>{firstName} has not uploaded any files.</h5>
          }
          <h4 className={styles.subtitle}>Links</h4>
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
        </div>
        }
      </section>
  )
}