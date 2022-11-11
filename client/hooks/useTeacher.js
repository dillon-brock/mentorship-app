import { useEffect } from "react";
import { getTeacherById } from "../services/teacher";

export function useTeacher(id) {
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const fetchTeacherById = async () => {
      const data = await getTeacherById(id);
      setTeacher(data);
    }
    fetchTeacherById();
  }, []);

  return { teacher, setTeacher };
}