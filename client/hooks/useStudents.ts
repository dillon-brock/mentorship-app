import { useEffect, useState } from "react";
import { getStudents } from "../services/teacher.js";
import { CurrentStudent } from "../types.js";

export function useStudents() {
  const [pendingStudents, setPendingStudents] = useState<CurrentStudent[]>([]);
  const [approvedStudents, setApprovedStudents] = useState<CurrentStudent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await getStudents();
      if (data) {
        setPendingStudents(data.filter((s: CurrentStudent) => s.connectionApproved === 'pending'));
        setApprovedStudents(data.filter((s: CurrentStudent) => s.connectionApproved === 'approved'));
        setLoading(false);
      }
      setLoading(false);
    }
    fetchStudents();
  }, []);

  return { pendingStudents, setPendingStudents, approvedStudents, setApprovedStudents, loading };
}