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
      let data = await getTeachers(subject, lessonType, minPrice, maxPrice);
      if (zipCode && Number(radius)) {
        const zipCodesInRadius = await getZipCodesInRadius({ zipCode, radius });
        const errorStatus = zipCodesInRadius.error_code;
        if (errorStatus === 404) {
          setErrorMessage('Please enter a valid zip code to find instructors near you.');
        } else {
          data = data.filter(t => zipCodesInRadius.zip_codes.includes(t.zipCode));
        }
      } else if (zipCode && radius === '0') {
        data = data.filter(t => t.zipCode === zipCode);
      }
      const pagedData = data.slice((page - 1) * pageLength, page * pageLength);
      setTeachers(pagedData);
      setTotalPages(Math.ceil(data.length / pageLength));
      setLoading(false);
    }
    fetchTeachers();
  }, [subject, zipCode, radius, page, pageLength, lessonType, minPrice, maxPrice])

  return { teachers, setTeachers, totalPages, errorMessage, setErrorMessage, loading };

}