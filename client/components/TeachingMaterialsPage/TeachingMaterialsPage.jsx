import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import useTeachingMaterials from "../../hooks/useTeachingMaterials";
import Header from "../Header/Header";

export default function TeachingMaterialsPage() {
  const { user, doneGettingUser} = useUserContext();
  const { pathname } = useLocation();
  const { subjectsWithTeachingMaterials, setSubjectsWithTeachingMaterials } = useTeachingMaterials(user?.teacherId);

  if (!user && doneGettingUser) return <Navigate to={`/auth/sign-up/teacher?callback=${pathname}`} />

  return (
    <>
      <Header />
      <h1>Your Teaching Materials</h1>
      
    </>
  )
}