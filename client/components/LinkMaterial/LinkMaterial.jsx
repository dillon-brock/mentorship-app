import { useState } from "react";
import { Button, Container, OverlayTrigger, Popover } from "react-bootstrap";
import { FaEllipsisH } from "react-icons/fa";
import DeleteMaterialModal from "../DeleteMaterialModal/DeleteMaterialModal";
import EditLinkModal from "../EditLinkModal/EditLinkModal";

export default function LinkMaterial({ id, name, url, setTeachingMaterials, subjects }) {

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
        <p onClick={handleClickEdit}>Edit</p>
        <p onClick={handleClickDelete}>Delete</p>
      </Container>
    </Popover.Body>
  </Popover>
  )

  return (
    <>
      <div style={{ height: '26px', display: 'flex', justifyContent: 'flex-start', gap: '20px', alignItems: 'start' }} onMouseEnter={() => setShowMenuButton(true)} onMouseLeave={handleMouseLeave}>
        {name ? <a href={url} target="_blank">{name}</a>
        :
        <a href={url} target="_blank" />
      }
        {showMenuButton &&
          <OverlayTrigger show={openPopover} trigger="click" placement="right" overlay={popover}>
            <Button variant="light" onClick={() => setOpenPopover(!openPopover)} style={{ padding: '0px 8px'}}>
              <FaEllipsisH />
            </Button>
          </OverlayTrigger>
        }
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
        name={name}
        url={url}
        setTeachingMaterials={setTeachingMaterials}
        subjects={subjects}
      />
    </>
  )
}