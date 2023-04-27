import { useEffect, useState } from "react";
import { getSubjectsByTeacherId } from "../services/subjects/subjects";

type Subject = {
  id: string;
  teacherId: string;
  subject: string;
  minPrice: number;
  maxPrice: number;
  lessonType: string;
}

export default function useSubjects(id: string) {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (id) {
        const data = await getSubjectsByTeacherId(id);
        setSubjects(data);
      }
    }
    fetchSubjects();
  }, [id]);

  return { subjects };
}