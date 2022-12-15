import { useState } from "react";
import { Button, Container, OverlayTrigger, Popover } from "react-bootstrap";
import { FaEllipsisH } from "react-icons/fa";
import DeleteMaterialModal from "../DeleteMaterialModal/DeleteMaterialModal";
import EditLinkModal from "../EditLinkModal/EditLinkModal";
import styles from './linkMaterial.module.css';

export default function LinkMaterial({ id, name, url, subjectId, setTeachingMaterials, subjects }) {
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [userWantsToDeleteLink, setUserWantsToDeleteLink] = useState(false);
  const [userWantsToEditLink, setUserWantsToEditLink] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

  const handleMouseLeave = () => {
    setShowMenuButton(false);
    setOpenPopover(false);
  }

  const handleClickDelete = () => {
    setUserWantsToDeleteLink(true);
    setOpenPopover(false);
  }

  const handleClickEdit = () => {
    setUserWantsToEditLink(true);
    setOpenPopover(false);
  }

  const popover = (
    <Popover id="popover-basic">
    <Popover.Body>
      <Container className="d-flex flex-column">
        <Button className={styles.popoverOption} onClick={handleClickEdit}>Edit</Button>
        <Button className={styles.popoverOption} onClick={handleClickDelete}>Delete</Button>
      </Container>
    </Popover.Body>
  </Popover>
  )

  return (
    <>
    <div className={styles.container}>
      <div 
        className={styles.linkContainer} 
        onMouseEnter={() => setShowMenuButton(true)} 
        onMouseLeave={handleMouseLeave}
      >
        {name ? <a href={url} target="_blank">{name}</a>
        :
        <a href={url} target="_blank">{url}</a>
        }
        {showMenuButton &&
        <div style={{ position: 'absolute', right: '100px'}}>
          <OverlayTrigger show={openPopover} trigger="click" placement="right" overlay={popover}>
            <Button variant="light" onClick={() => setOpenPopover(!openPopover)} className={styles.popupButton}>
              <FaEllipsisH />
            </Button>
          </OverlayTrigger>
        </div>
        }
      </div>
    </div>
      <DeleteMaterialModal
      userWantsToDelete={userWantsToDeleteLink}
      setUserWantsToDelete={setUserWantsToDeleteLink}
      id={id}
      setTeachingMaterials={setTeachingMaterials}
      materialType={'link'}
      />
      <EditLinkModal
        userWantsToEditLink={userWantsToEditLink}
        setUserWantsToEditLink={setUserWantsToEditLink}
        id={id}
        subjectId={subjectId}
        name={name}
        url={url}
        setTeachingMaterials={setTeachingMaterials}
        subjects={subjects}
      />
    </>
  )
}