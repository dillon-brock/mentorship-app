import { useEffect, useState } from "react";
import { getTeachingMaterialsByTeacherId } from "../services/teachingMaterials.js";

export default function useTeachingMaterials(id) {
  const [subjectsWithTeachingMaterials, setSubjectsWithTeachingMaterials] = useState([]);

  useEffect(() => {
    const fetchTeachingMaterials = async () => {
      if (id) {
        const data = await getTeachingMaterialsByTeacherId(id)
        console.log(data);
        setSubjectsWithTeachingMaterials(data);
      }
    }
    fetchTeachingMaterials();
  }, [id]);

  return { subjectsWithTeachingMaterials, setSubjectsWithTeachingMaterials }
}