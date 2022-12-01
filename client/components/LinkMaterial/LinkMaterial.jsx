import { useState } from "react";
import { Button, Container, OverlayTrigger, Popover } from "react-bootstrap";
import { FaEllipsisH } from "react-icons/fa";

export default function LinkMaterial({ name, url }) {

  const [showMenuButton, setShowMenuButton] = useState(false);
  const [userWantsToDeleteFile, setUserWantsToDeleteFile] = useState(false);
  const [userWantsToEditFile, setUserWantsToEditFile] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);

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
  )
}