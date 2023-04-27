import { useEffect, useState } from "react";
import { getTeacherProfile } from "../services/teacher/teacher";
import { Teacher } from "../types";
import { defaultTeacher } from "../defaultValues";

export default function useTeacherProfile(id: string) {
  const [teacher, setTeacher] = useState<Teacher>(defaultTeacher);
  const [zipCode, setZipCode] = useState<string>('');
  const [stateName, setStateName] = useState<string>('');
  const [cityName, setCityName] = useState<string>('');

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await getTeacherProfile();
      setTeacher(data);
      setZipCode(data.zipCode);
      setCityName(data.city);
      setStateName(data.state);
    }
    fetchProfileData();
  }, [id]);

  return { teacher, setTeacher, zipCode, setZipCode, stateName, setStateName, cityName, setCityName };
}