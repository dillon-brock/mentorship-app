import { useEffect, useState } from "react";
import { getSubjectsByTeacherId } from "../services/subjects.js";
import { getTeachingMaterials } from "../services/teachingMaterials.js";

export default function useTeachingMaterials(id) {
  const [subjects, setSubjects] = useState([]);
  const [teachingMaterials, setTeachingMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachingMaterials = async () => {
      if (id) {
        const subjectsData = await getSubjectsByTeacherId(id)
        const materialsData = await getTeachingMaterials();
        setTeachingMaterials(materialsData);
        setSubjects(subjectsData);
        setLoading(false);
      }
    }
    fetchTeachingMaterials();
  }, [id]);

  return { teachingMaterials, setTeachingMaterials, subjects, loading }
}