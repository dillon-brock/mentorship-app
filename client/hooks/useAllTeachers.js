import { useEffect, useState } from "react";
import { getTeachers } from "../services/teacher.js";
import { getZipCodesInRadius } from "../services/zipcode.js";

export function useAllTeachers(subject, zipCode, radius, page, pageLength) {
  const [teachers, setTeachers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await getTeachers(subject);
      if (zipCode && radius) {
        const zipCodesInRadius = await getZipCodesInRadius({ zipCode, radius });
        const filteredData = data.filter(t => zipCodesInRadius.zip_codes.includes(t.zipCode));
        const pagedData = filteredData.slice((page - 1) * pageLength, page * pageLength);
        setTeachers(pagedData);
        setTotalPages(Math.ceil(filteredData.length / pageLength));
      } else {
        setTotalPages(Math.ceil(data.length / pageLength));
        const pagedData = data.slice((page - 1) * pageLength, page * pageLength);
        setTeachers(pagedData);
      }
    }
    fetchTeachers();
  }, [subject, zipCode, radius, page, pageLength])

  return { teachers, setTeachers, totalPages };

}