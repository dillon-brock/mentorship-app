import { useEffect, useState } from "react";
import { getTeachers } from "../services/teacher.js";
import { getZipCodesInRadius } from "../services/zipcode.js";

export function useAllTeachers(subject, zipCode, radius) {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await getTeachers(subject);
      if (zipCode && radius) {
        const zipCodesInRadius = await getZipCodesInRadius({ zipCode, radius });
        setTeachers(data.filter(t => zipCodesInRadius.zip_codes.includes(t.zipCode)));
      } else {
        setTeachers(data);
      }
    }
    fetchTeachers();
  }, [subject, zipCode, radius])

  return { teachers, setTeachers };

}