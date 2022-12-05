import { Button, Modal } from "react-bootstrap";
import { deleteTeachingMaterial } from "../../services/teachingMaterials";
import styles from './deleteMaterialModal.module.css';

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
        <Modal.Body className={styles.modalContent}>Are you sure you want to delete this {materialType}?</Modal.Body>
        <Modal.Footer>
          <Button className={styles.cancelButton} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={styles.deleteButton} onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}