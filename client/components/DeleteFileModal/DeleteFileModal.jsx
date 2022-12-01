import { Button, Modal } from "react-bootstrap";
import { deleteTeachingMaterial } from "../../services/teachingMaterials";

export default function DeleteFileModal({ userWantsToDeleteFile, setUserWantsToDeleteFile, id, fileName, setTeachingMaterials }) {
  const handleClose = () => setUserWantsToDeleteFile(false);

  const handleDeleteFile = async () => {
    const deletedMaterial = await deleteTeachingMaterial(id);
    setTeachingMaterials(prev => prev.filter(material => material.id !== deletedMaterial.id));
    setUserWantsToDeleteFile(false);
  }

  return (
    <>
      <Modal show={userWantsToDeleteFile} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>Are you sure you want to delete the file {fileName}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDeleteFile}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}