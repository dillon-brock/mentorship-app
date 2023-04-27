import { Modal, Tab, Tabs } from "react-bootstrap";
import MaterialFileUploadForm from "../MaterialFileUploadForm/MaterialFileUploadForm";
import MaterialLinkUploadForm from "../MaterialLinkUploadForm/MaterialLinkUploadForm";
import { Dispatch, SetStateAction } from "react";
import TeachingMaterial from "../../../server/models/TeachingMaterial";
import Subject from "../../../server/models/Subject";

type Props = {
  showUploadModal: boolean;
  setShowUploadModal: Dispatch<SetStateAction<boolean>>;
  setTeachingMaterials: Dispatch<SetStateAction<TeachingMaterial[]>>;
  subjects: Subject[];
}

export default function MaterialUploadModal({ 
  showUploadModal, 
  setShowUploadModal, 
  setTeachingMaterials, 
  subjects 
}: Props) {
  
  const handleClose = () => setShowUploadModal(false);

  return (
    <Modal show={showUploadModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upload Teaching Materials</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          defaultActiveKey="file"
          id="upload-type"
          className="mb-3"
          justify
        >
          <Tab eventKey="file" title="File">
            <MaterialFileUploadForm
              setShowUploadModal={setShowUploadModal}
              subjects={subjects}
              setTeachingMaterials={setTeachingMaterials}
            />
          </Tab>
          <Tab eventKey="link" title="Link">
            <MaterialLinkUploadForm
              subjects={subjects}
              setShowUploadModal={setShowUploadModal}
              setTeachingMaterials={setTeachingMaterials}
            />
          </Tab>
        </Tabs>
      </Modal.Body>
    </Modal>
  )
}