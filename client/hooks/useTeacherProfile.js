import { useEffect } from "react";
import { getTeacherProfile } from "../services/teacher";

export default function useTeacherProfile(id) {
  const [teacher, setTeacher] = useState({});
  const [zipCode, setZipCode] = useState('');
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await getTeacherProfile(id);
      setTeacher(data);
      setZipCode(data.zipCode);
      setCityName(data.city);
      setStateName(data.stateName);
    }
  }, [id]);
  fetchProfileData();

  return { teacher, setTeacher, zipCode, setZipCode, stateName, setStateName, cityName, setCityName };
}