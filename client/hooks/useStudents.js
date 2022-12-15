import { useEffect, useState } from "react";
import { getStudents } from "../services/teacher.js";

export function useStudents() {
  const [pendingStudents, setPendingStudents] = useState([]);
  const [approvedStudents, setApprovedStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudents();
      if (data) {
        setPendingStudents(data.filter(s => s.connectionApproved === 'pending'));
        setApprovedStudents(data.filter(s => s.connectionApproved === 'approved'));
        setLoading(false);
      }
      setLoading(false);
    }
    fetchStudents();
  }, []);

  return { pendingStudents, setPendingStudents, approvedStudents, setApprovedStudents, loading };
}