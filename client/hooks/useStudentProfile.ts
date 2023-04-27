import { useEffect, useState } from "react";
import { getStudentProfile } from "../services/student.js";
import { Student } from "../types.js";

export default function useStudentProfile() {
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await getStudentProfile();
      setStudent(data);
    }
    fetchProfileData();
  }, []);

  return { student, setStudent }
}