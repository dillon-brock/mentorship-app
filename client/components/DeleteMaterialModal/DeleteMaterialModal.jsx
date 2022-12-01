import { Button, Modal } from "react-bootstrap";
import { deleteTeachingMaterial } from "../../services/teachingMaterials";

export default function DeleteMaterialModal({ userWantsToDelete, setUserWantsToDelete, id, setTeachingMaterials, materialType }) {
  const handleClose = () => setUserWantsToDelete(false);

  const handleDelete = async () => {
    const deletedMaterial = await deleteTeachingMaterial(id);
    setTeachingMaterials(prev => prev.filter(material => material.id !== deletedMaterial.id));
    setUserWantsToDelete(false);
  }

  return (
    <>
      <Modal show={userWantsToDelete} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>Are you sure you want to delete this {materialType}?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}