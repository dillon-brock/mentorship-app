import { useEffect, useState } from "react";
import { getReviews } from "../services/reviews/reviews";
import { getTeacherById } from "../services/teacher/teacher";
import { getAverageRating } from "../utils";
import Review from "../../server/models/Review";
import { Teacher } from '../types';
import { ConnectionData } from "../types";

export function useTeacher(id: string) {
  const [teacher, setTeacher] = useState<Teacher>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [connection, setConnection] = useState<ConnectionData | null>(null);
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