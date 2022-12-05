import { useState } from "react"
import { Button, Container, Image, OverlayTrigger, Popover } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import DeleteMaterialModal from "../DeleteMaterialModal/DeleteMaterialModal";
import EditFileModal from "../EditFileModal/EditFileModal";
import styles from './fileMaterial.module.css';

export default function FileMaterial({ id, subjectId, url, name, setTeachingMaterials, subjects }) {

  const [showMenuButton, setShowMenuButton] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [userWantsToDeleteFile, setUserWantsToDeleteFile] = useState(false);
  const [userWantsToEditFile, setUserWantsToEditFile] = useState(false);

  const handleMouseLeave = () => {
    setShowMenuButton(false);
    setOpenPopover(false);
  }

  const handleClickDelete = () => {
    setUserWantsToDeleteFile(true);
    setOpenPopover(false);
  }

  const handleClickEdit = () => {
    setUserWantsToEditFile(true);
    setOpenPopover(false);
  }

  const popover = (
  <Popover id="popover-basic">
    <Popover.Body>
      <Container className="d-flex flex-column">
        <p onClick={handleClickEdit}>Edit</p>
        <p onClick={handleClickDelete}>Delete</p>
      </Container>
    </Popover.Body>
  </Popover>
  )

  return (
    <>
      <div onMouseEnter={() => setShowMenuButton(true)} onMouseLeave={handleMouseLeave} style={{ position: 'relative', display: 'flex', width: '275px', height: '360px', flexDirection: 'column', alignItems: 'center'}}>
        <a href={url} key={url} target="_blank">
          <div className={styles.imageContainer}>
            <Image src={`${url.slice(0, -3)}png`} className={styles.image}/>
          </div>
          {name && <p className={styles.fileName}>{name}</p>}
        </a>
        {showMenuButton &&
        <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
          <OverlayTrigger show={openPopover} trigger="click" placement="right" overlay={popover}>
            <Button variant="light" onClick={() => setOpenPopover(!openPopover)}>
              <FaEllipsisV />
            </Button>
          </OverlayTrigger>
        </div>
        }
      </div>
      <DeleteMaterialModal
        userWantsToDelete={userWantsToDeleteFile}
        setUserWantsToDelete={setUserWantsToDeleteFile}
        id={id}
        setTeachingMaterials={setTeachingMaterials}
        materialType={'file'}
      />
      <EditFileModal
        userWantsToEditFile={userWantsToEditFile}
        setUserWantsToEditFile={setUserWantsToEditFile}
        id={id}
        subjectId={subjectId}
        name={name}
        url={url}
        subjects={subjects}
        setTeachingMaterials={setTeachingMaterials}
      />
    </>
  )
}