import { useEffect, useState } from "react";
import { getReviews } from "../services/reviews.js";
import { getTeacherById } from "../services/teacher.js";
import { getAverageRating } from "../utils.js";
import Review from "../../server/models/Review";
import Teacher from "../../server/models/Teacher.js";
import { ConnectionData, EmptyObject } from "../types";

export function useTeacher(id: string) {
  const [teacher, setTeacher] = useState<Teacher | EmptyObject>({});
  const [reviews, setReviews] = useState<Review[]>([]);
  const [connection, setConnection] = useState<ConnectionData | EmptyObject | null>({});
  const [avgRating, setAvgRating] = useState<number>(0);

  useEffect(() => {
    const fetchTeacherById: () => Promise<void> = async () => {
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