import { Button, Modal } from "react-bootstrap";
import { deleteTeachingMaterial } from "../../services/teachingMaterials/teachingMaterials";
import styles from './deleteMaterialModal.module.css';
import globalStyles from '../../global.module.css';
import { Dispatch, SetStateAction } from "react";
import TeachingMaterial from "../../../server/models/TeachingMaterial";

type Props = {
  userWantsToDelete: boolean;
  setUserWantsToDelete: Dispatch<SetStateAction<boolean>>;
  id: string;
  setTeachingMaterials: Dispatch<SetStateAction<TeachingMaterial[]>>;
  materialType: string;
}

export default function DeleteMaterialModal({ userWantsToDelete, setUserWantsToDelete, id, setTeachingMaterials, materialType }: Props) {
  const handleClose = () => setUserWantsToDelete(false);

  const handleDelete = async () => {
    await deleteTeachingMaterial(id);
    setTeachingMaterials(prev => prev.filter(material => material.id !== id));
    setUserWantsToDelete(false);
  }

  return (
    <>
      <Modal show={userWantsToDelete} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body className={styles.modalContent}>Are you sure you want to delete this {materialType}?</Modal.Body>
        <Modal.Footer>
          <Button className={globalStyles.cancelButton} onClick={handleClose}>
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