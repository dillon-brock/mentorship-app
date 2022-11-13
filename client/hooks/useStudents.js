import { useEffect, useState } from "react";
import { getStudents } from "../services/teacher.js";

export function useStudents(teacherId) {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudents(teacherId);
      setPendingStudents(data.filter(s => s.connectionApproved === 'pending'));
      setApprovedStudents(data.filter(s => s.connectionApproved === 'approved'));
    }
    fetchStudents();
  }, [teacherId]);

  return { pendingStudents, setPendingStudents, approvedStudents, setApprovedStudents };
}