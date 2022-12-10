import { useEffect, useState } from "react";
import { getTeachers } from "../services/teacher.js";
import { getZipCodesInRadius } from "../services/zipcode.js";

export function useAllTeachers(subject, zipCode, lessonType, minPrice, maxPrice, radius, page, pageLength) {
  const [teachers, setTeachers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      const data = await getTeachers(subject, lessonType, minPrice, maxPrice);
      if (zipCode && radius) {
        const zipCodesInRadius = await getZipCodesInRadius({ zipCode, radius });
        const errorStatus = zipCodesInRadius.error_code;
        if (errorStatus === 404) {
          const pagedData = data.slice((page - 1) * pageLength, page * pageLength);
          setTeachers(pagedData);
          setTotalPages(Math.ceil(data.length / pageLength));
          setErrorMessage('Please enter a valid zip code to find instructors near you.');
          setLoading(false);
        } else {
          const filteredData = data.filter(t => zipCodesInRadius.zip_codes.includes(t.zipCode));
          const pagedData = filteredData.slice((page - 1) * pageLength, page * pageLength);
          setTeachers(pagedData);
          setTotalPages(Math.ceil(filteredData.length / pageLength));
          setLoading(false);
        }
      } else {
        setTotalPages(Math.ceil(data.length / pageLength));
        const pagedData = data.slice((page - 1) * pageLength, page * pageLength);
        setTeachers(pagedData);
        setLoading(false);
      }
    }
    fetchTeachers();
  }, [subject, zipCode, radius, page, pageLength, lessonType, minPrice, maxPrice])

  return { teachers, setTeachers, totalPages, errorMessage, setErrorMessage, loading };

}