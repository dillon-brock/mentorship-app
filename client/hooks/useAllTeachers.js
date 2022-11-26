import { useEffect, useState } from "react";
import { getTeachers } from "../services/teacher.js";
import { getZipCodesInRadius } from "../services/zipcode.js";

export function useAllTeachers(subject, zipCode, radius, pageLength) {
  const [teachers, setTeachers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await getTeachers(subject);
      if (zipCode && radius) {
        const zipCodesInRadius = await getZipCodesInRadius({ zipCode, radius });
        const filteredData = data.filter(t => zipCodesInRadius.zip_codes.includes(t.zipCode))
        setTeachers(filteredData);
        setTotalPages(Math.ceil(filteredData.length / pageLength));
      } else {
        setTeachers(data);
      }
    }
    fetchTeachers();
  }, [subject, zipCode, radius, pageLength])

  return { teachers, setTeachers, totalPages };

}