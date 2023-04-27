import { useEffect, useState } from "react";
import { getTeachers } from "../services/teacher.js";
import { getZipCodesInRadius } from "../services/zipcode";
import { TeacherWithSubjects, ZipCodeListResponse } from "../types";

export function useAllTeachers(subject: string, zipCode: string, lessonType: string, 
  minPrice: number, maxPrice: number, radius: string, page: number, pageLength: number) {

  const [teachers, setTeachers] = useState<TeacherWithSubjects[]>([]);
  const [zipCodeErrorMessage, setZipCodeErrorMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTeachers = async () => {
      setLoading(true);
      try {
        // get list of teachers from database with parameters for backend filtering
        let teachersData: TeacherWithSubjects[] = await getTeachers(subject, lessonType, minPrice, maxPrice);
  
        // further filter list based on location if the user has input a zip code and distance radius
        if (zipCode && Number(radius)) {
          // get list of zip codes within the distance radius using the ZIPcode API, converted to Set to allow for O(1) searching
          const zipCodeData = await getZipCodesInRadius({ zipCode, radius });

          if (zipCodeData.valid) {
            const zipCodesInRadius: Set<string> = new Set(zipCodeData.zip_codes);
            teachersData = teachersData.filter(teacher => zipCodesInRadius.has(teacher.zipCode));
          }
          else {
            const errorStatus = zipCodeData.error_code;
            if (errorStatus === 404) {
              setZipCodeErrorMessage('Please enter a valid zip code to find instructors near you.');
            }
          }

          // check that the input zip code refers to a real location, if not the list of teachers will not be filtered by location
          // necessary to check for a radius of 0 here because the zipCode API does not allow for a radius argument of 0
        } else if (zipCode && radius === '0') {
          teachersData = teachersData.filter(teacher => teacher.zipCode === zipCode);
        }
        const pagedTeachers = teachersData.slice((page - 1) * pageLength, page * pageLength);
        setTeachers(pagedTeachers);
        setTotalPages(Math.ceil(teachersData.length / pageLength));
        setLoading(false);
      } catch (e) {
        setErrorMessage('An error occurred. Please try adjusting your search parameters and/or refreshing the page.');
        setTotalPages(1);
        setLoading(false);
      }
    }
    fetchTeachers();
  }, [subject, zipCode, radius, page, pageLength, lessonType, minPrice, maxPrice])

  return { teachers, setTeachers, totalPages, zipCodeErrorMessage, setZipCodeErrorMessage, errorMessage, setErrorMessage, loading };

}