import { useEffect, useState } from "react";
import { getStudents } from "../services/teacher.js";

export function useStudents() {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudents();
      console.log(data);
      if (data) {
        setPendingStudents(data.filter(s => s.connectionApproved === 'pending'));
        setApprovedStudents(data.filter(s => s.connectionApproved === 'approved'));
      }
    }
    fetchStudents();
  });

  return { pendingStudents, setPendingStudents, approvedStudents, setApprovedStudents };
}