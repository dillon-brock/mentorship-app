import { useEffect, useState } from "react";
import { getTeachers } from "../services/teacher.js";
import { getZipCodesInRadius } from "../services/zipcode.js";

export function useAllTeachers(subject, zipCode, radius) {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const zipCodesInRadius = await getZipCodesInRadius({ zipCode: '97214', radius: '200' });
      console.log(zipCodesInRadius);
      const data = await getTeachers(subject);
      setTeachers(data.filter(t => zipCodesInRadius.zip_codes.includes(t.zipCode)));
    }
    fetchTeachers();
  }, [subject])

  return { teachers, setTeachers };

}