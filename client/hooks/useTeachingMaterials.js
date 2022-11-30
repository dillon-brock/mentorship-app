import { useEffect, useState } from "react";
import { getTeachingMaterialsByTeacherId } from "../services/teachingMaterials.js";

export default function useTeachingMaterials(id) {
  const [subjectsWithTeachingMaterials, setSubjectsWithTeachingMaterials] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachingMaterials, setTeachingMaterials] = useState([]);

  useEffect(() => {
    const fetchTeachingMaterials = async () => {
      if (id) {
        const data = await getTeachingMaterialsByTeacherId(id)
        setSubjectsWithTeachingMaterials(data);
        setSubjects(data.reduce((a, b) => {
          a.push({ id: b.id, name: b.subject });
          return a;
        }, []));
        setTeachingMaterials(data.reduce((a, b) => {
          a.push(b.teachingMaterials);
          return a;
        }, [])
        .flat());
      }
    }
    fetchTeachingMaterials();
  }, [id]);

  return { subjectsWithTeachingMaterials, setSubjectsWithTeachingMaterials, subjects, teachingMaterials, setTeachingMaterials }
}