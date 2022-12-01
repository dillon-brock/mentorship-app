import { useEffect, useState } from "react";
import { getLearningMaterials } from "../services/student.js";

export default function useLearningMaterials() {

  const [teachersWithMaterials, setTeachersWithMaterials] = useState([])

  useEffect(() => {
    const fetchMaterials = async () => {
      const data = await getLearningMaterials();
      setTeachersWithMaterials(data);
    }
    fetchMaterials();
  }, []);

  return { teachersWithMaterials };
}