import { useEffect, useState } from "react";
import { getTeacherById } from "../services/teacher.js";

export function useTeacher(id) {
  const [teacher, setTeacher] = useState({});

  useEffect(() => {
    const fetchTeacherById = async () => {
      const data = await getTeacherById(id);
      setTeacher(data);
    }
    fetchTeacherById();
  }, []);

  return { teacher, setTeacher };
}