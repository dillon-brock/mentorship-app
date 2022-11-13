import { useEffect, useState } from "react";
import { getTeacherById } from "../services/teacher.js";

export function useTeacher(id) {
  const [teacher, setTeacher] = useState({});
  const [connection, setConnection] = useState({});

  useEffect(() => {
    const fetchTeacherById = async () => {
      const data = await getTeacherById(id);
      setTeacher(data.teacher);
      setConnection(data.connection);
    }
    fetchTeacherById();
  }, []);

  return { teacher, setTeacher, connection, setConnection };
}