import { useEffect, useState } from "react";
import { getLearningMaterials } from "../services/student.js";

export default function useLearningMaterials() {

  const [teachersWithMaterials, setTeachersWithMaterials] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      const data = await getLearningMaterials();
      setTeachersWithMaterials(data);
      setLoading(false);
    }
    fetchMaterials();
  }, []);

  return { teachersWithMaterials, loading };
}