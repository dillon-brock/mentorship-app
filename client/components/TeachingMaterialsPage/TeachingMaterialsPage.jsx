import { useState } from "react";
import { Button } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import useTeachingMaterials from "../../hooks/useTeachingMaterials";
import Header from "../Header/Header";
import MaterialsSubjectSection from "../MaterialsSubjectSection/MaterialsSubjectSection";
import MaterialUploadModal from "../MaterialUploadModal/MaterialUploadModal";

export default function TeachingMaterialsPage() {
  const { user, doneGettingUser} = useUserContext();
  const { pathname } = useLocation();
  const {
    subjectsWithTeachingMaterials,
    subjects,
    teachingMaterials,
    setTeachingMaterials
  } = useTeachingMaterials(user?.teacherId);

  console.log(teachingMaterials);

  const [showUploadModal, setShowUploadModal] = useState(false);

  if (!user && doneGettingUser) return <Navigate to={`/auth/sign-up/teacher?callback=${pathname}`} />

  return (
    <>
      <Header />
      <h1>Your Teaching Materials</h1>
      {teachingMaterials.length > 0 ?
      <>
        <Button onClick={() => setShowUploadModal(true)}>Upload Materials</Button>
        {subjectsWithTeachingMaterials.map(subject => <MaterialsSubjectSection key={subject.id} { ...subject } setTeachingMaterials={setTeachingMaterials} subjects={subjects} />)}
      </>
      :
      <div>
        <h3>You current have no uploaded teaching materials.</h3>
        <Button onClick={() => setShowUploadModal(true)}>Upload Your First File</Button>
      </div>
      }
      <MaterialUploadModal
        showUploadModal={showUploadModal}
        setShowUploadModal={setShowUploadModal}
        subjects={subjects}
        setTeachingMaterials={setTeachingMaterials}
      />
    </>
  )
}