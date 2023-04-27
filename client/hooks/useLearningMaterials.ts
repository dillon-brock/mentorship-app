import { useEffect, useState } from "react";
import { getLearningMaterials } from "../services/student/student.js";
import { TeacherWithMaterials } from "../types.js";

export default function useLearningMaterials() {

  const [teachersWithMaterials, setTeachersWithMaterials] = useState<TeacherWithMaterials[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMaterials = async () => {
      const data: TeacherWithMaterials[] = await getLearningMaterials();
      setTeachersWithMaterials(data);
      setLoading(false);
    }
    fetchMaterials();
  }, []);

  return { teachersWithMaterials, loading };
}