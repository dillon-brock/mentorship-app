import { Modal, Tab, Tabs } from "react-bootstrap";
import MaterialFileUploadForm from "../MaterialFileUploadForm/MaterialFileUploadForm";
import MaterialLinkUploadForm from "../MaterialLinkUploadForm/MaterialLinkUploadForm";

export default function MaterialUploadModal({ showUploadModal, setShowUploadModal, setTeachingMaterials, subjects }) {
  
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