import { useEffect, useState } from "react";
import { getTeachers } from "../services/teacher.js";

export function useAllTeachers(subject) {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await getTeachers(subject);
      setTeachers(data);
    }
    fetchTeachers();
  }, [subject])

  return { teachers, setTeachers };

}