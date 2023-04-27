import { useEffect, useState } from "react";
import { getSubjectsByTeacherId } from "../services/subjects/subjects";
import { getTeachingMaterials } from "../services/teachingMaterials/teachingMaterials";
import { Subject, TeachingMaterial } from "../types";

export default function useTeachingMaterials(id: string) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachingMaterials, setTeachingMaterials] = useState<TeachingMaterial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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