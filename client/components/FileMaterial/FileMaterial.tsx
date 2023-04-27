import { Dispatch, SetStateAction, useState } from "react"
import { Button, Container, Image, OverlayTrigger, Popover } from "react-bootstrap";
import { FaEllipsisV } from "react-icons/fa";
import DeleteMaterialModal from "../DeleteMaterialModal/DeleteMaterialModal";
import EditFileModal from "../EditFileModal/EditFileModal";
import styles from './fileMaterial.module.css';
import TeachingMaterial from "../../../server/models/TeachingMaterial";
import Subject from "../../../server/models/Subject";

type Props = {
  id: string;
  subjectId: string;
  url: string;
  name: string;
  setTeachingMaterials: Dispatch<SetStateAction<TeachingMaterial[]>>; 
  subjects: Subject[];
}

export default function FileMaterial({ id, subjectId, url, name, setTeachingMaterials, subjects }: Props) {

  const [showMenuButton, setShowMenuButton] = useState<boolean>(false);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [userWantsToDeleteFile, setUserWantsToDeleteFile] = useState<boolean>(false);
  const [userWantsToEditFile, setUserWantsToEditFile] = useState<boolean>(false);

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

  const popover: JSX.Element = (
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
      <div onMouseEnter={() => setShowMenuButton(true)} onMouseLeave={handleMouseLeave} className={styles.fileContainer}>
        <a href={url} key={url} target="_blank">
          <div className={styles.imageContainer}>
            <Image src={`${url.slice(0, -3)}png`} className={styles.image}/>
          </div>
          {name && <p className={styles.fileName}>{name}</p>}
        </a>
        {showMenuButton &&
        <div className={styles.popoverButtonContainer}>
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