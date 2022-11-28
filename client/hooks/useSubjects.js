import { useEffect, useState } from "react";
import { getSubjectsByTeacherId } from "../services/subjects";

export default function useSubjects(id) {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      const data = await getSubjectsByTeacherId(id);
      setSubjects(data);
    }
    fetchSubjects();
  }, [id]);

  return { subjects };
}