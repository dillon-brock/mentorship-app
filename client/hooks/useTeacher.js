import { useEffect, useState } from "react";
import { getReviews } from "../services/reviews.js";
import { getTeacherById } from "../services/teacher.js";

export function useTeacher(id) {
  console.log(id);
  const [teacher, setTeacher] = useState({});
  const [reviews, setReviews] = useState([]);
  const [connection, setConnection] = useState({});

  useEffect(() => {
    const fetchTeacherById = async () => {
      const data = await getTeacherById(id);
      console.log(data);
      const reviews = await getReviews(id);
      setTeacher(data.teacher);
      setConnection(data.connection);
      setReviews(reviews);
    }
    fetchTeacherById();
  }, []);

  return { teacher, setTeacher, connection, setConnection, reviews, setReviews };
}