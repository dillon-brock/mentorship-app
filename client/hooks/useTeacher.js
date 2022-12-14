import { useEffect, useState } from "react";
import { getReviews } from "../services/reviews.js";
import { getTeacherById } from "../services/teacher.js";
import { getAverageRating } from "../utils.js";

export function useTeacher(id) {
  const [teacher, setTeacher] = useState({});
  const [reviews, setReviews] = useState([]);
  const [connection, setConnection] = useState({});
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const fetchTeacherById = async () => {
      const data = await getTeacherById(id);
      const reviews = await getReviews(id);
      setTeacher(data.teacher);
      setConnection(data.connection);
      setReviews(reviews);
      setAvgRating(getAverageRating(reviews));
    }
    fetchTeacherById();
  }, []);

  return { teacher, setTeacher, connection, setConnection, reviews, setReviews, avgRating, setAvgRating };
}