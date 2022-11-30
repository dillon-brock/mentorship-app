import { Button } from "react-bootstrap";
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import useTeachingMaterials from "../../hooks/useTeachingMaterials";
import Header from "../Header/Header";
import MaterialsSubjectSection from "../MaterialsSubjectSection/MaterialsSubjectSection";

export default function TeachingMaterialsPage() {
  const { user, doneGettingUser} = useUserContext();
  const { pathname } = useLocation();
  const { subjectsWithTeachingMaterials, setSubjectsWithTeachingMaterials } = useTeachingMaterials(user?.teacherId);

  if (!user && doneGettingUser) return <Navigate to={`/auth/sign-up/teacher?callback=${pathname}`} />

  return (
    <>
      <Header />
      <h1>Your Teaching Materials</h1>
      {subjectsWithTeachingMaterials.length > 0 ?
      <>
        {subjectsWithTeachingMaterials.map(subject => <MaterialsSubjectSection key={subject.id} { ...subject } />)}
      </>
      :
      <div>
        <h3>You current have no uploaded teaching materials.</h3>
        <Button>Upload Your First File</Button>
      </div>
      }
    </>
  )
}