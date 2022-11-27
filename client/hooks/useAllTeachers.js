import { useEffect, useState } from "react";
import { getTeachers } from "../services/teacher.js";
import { getZipCodesInRadius } from "../services/zipcode.js";

export function useAllTeachers(subject, zipCode, radius, page, pageLength) {
  const [teachers, setTeachers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await getTeachers(subject);
      if (zipCode && radius) {
        const zipCodesInRadius = await getZipCodesInRadius({ zipCode, radius });
        const errorStatus = zipCodesInRadius.error_code;
        if (errorStatus === 404) {
          const pagedData = data.slice((page - 1) * pageLength, page * pageLength);
          setTeachers(pagedData);
          setTotalPages(Math.ceil(data.length / pageLength));
          setErrorMessage('Please enter a valid zip code to find instructors near you.');
        } else {
          const filteredData = data.filter(t => zipCodesInRadius.zip_codes.includes(t.zipCode));
          const pagedData = filteredData.slice((page - 1) * pageLength, page * pageLength);
          setTeachers(pagedData);
          setTotalPages(Math.ceil(filteredData.length / pageLength));
        }
      } else {
        setTotalPages(Math.ceil(data.length / pageLength));
        const pagedData = data.slice((page - 1) * pageLength, page * pageLength);
        setTeachers(pagedData);
      }
    }
    fetchTeachers();
  }, [subject, zipCode, radius, page, pageLength])

  return { teachers, setTeachers, totalPages, errorMessage, setErrorMessage };

}