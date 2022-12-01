import { Accordion } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import useLearningMaterials from "../../hooks/useLearningMaterials"
import Header from "../Header/Header";
import LearningMaterialsSection from "../LearningMaterialsSection/LearningMaterialsSection";

export default function LearningMaterialsPage() {
  const { teachersWithMaterials } = useLearningMaterials();
  const { user, doneGettingUser } = useUserContext();
  const { pathname } = useLocation();

  if (!user && doneGettingUser)
    return <Navigate to={`/auth/sign-in?callback=${pathname}`} />

  return (
    <>
      <Header />
      <h1>Your Learning Materials</h1>
      <Accordion defaultActiveKey="0">
        {teachersWithMaterials.map((teacher, i) => (
          <LearningMaterialsSection key={teacher.id} { ...teacher} i={i} />
        ))}
      </Accordion>
    </>
  )
}