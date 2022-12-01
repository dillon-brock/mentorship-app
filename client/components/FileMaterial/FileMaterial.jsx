import { useState } from "react"
import { Button, Container, Image, OverlayTrigger, Popover } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import DeleteFileModal from "../DeleteFileModal/DeleteFileModal";

export default function FileMaterial({ id, url, name, setTeachingMaterials }) {

  const [showMenuButton, setShowMenuButton] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [userWantsToDeleteFile, setUserWantsToDeleteFile] = useState(false);
  const [userWantsToEditFile, setUserWantsToEditFile] = useState(false);
  console.log(openPopover);

  const handleMouseLeave = () => {
    setShowMenuButton(false);
    setOpenPopover(false);
  }

  const handleClickDelete = () => {
    setUserWantsToDeleteFile(true);
    setOpenPopover(false);
  }

  const popover = (
  <Popover id="popover-basic">
    <Popover.Body>
      <Container className="d-flex flex-column">
        <p>Edit</p>
        <p onClick={handleClickDelete}>Delete</p>
      </Container>
    </Popover.Body>
  </Popover>
  )

  return (
    <>
      <div onMouseEnter={() => setShowMenuButton(true)} onMouseLeave={handleMouseLeave} style={{ position: 'relative', display: 'flex', width: '275px', height: '360px', flexDirection: 'column', alignItems: 'center'}}>
        <a href={url} key={url} target="_blank">
          <div style={{ width: "275px", height: "330px", border: '2px solid black', borderRadius: '10px' }}>
            <Image src={`${url.slice(0, -3)}png`} style={{ width: '100%', height: '100%'}} rounded/>
          </div>
          {name && <p style={{ textAlign: 'center' }}>{name}</p>}
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
      <DeleteFileModal
        userWantsToDeleteFile={userWantsToDeleteFile}
        setUserWantsToDeleteFile={setUserWantsToDeleteFile}
        fileName={name}
        id={id}
        setTeachingMaterials={setTeachingMaterials}
      />
    </>
  )
}