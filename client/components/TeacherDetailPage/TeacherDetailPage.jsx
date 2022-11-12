import { Image } from "react-bootstrap";
import { Navigate, useParams } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { useTeacher } from "../../hooks/useTeacher";
import Header from "../Header/Header";
import StarRating from "../StarRating/StarRating";

export default function TeacherDetailPage() {
  const { user } = useUserContext();
  const { id } = useParams();
  const { teacher } = useTeacher(id);

  if (!user) return <Navigate to='/auth/sign-in' />
  console.log(teacher);

  return (
    <>
      <Header />
      <Image fluid roundedCircle src={teacher.imageUrl} style={{width: '300px', height: '300px' }}/>
      <p>{teacher.firstName} {teacher.lastName}</p>
      <p>{teacher.subject}  |  {teacher.zipCode}</p>
      <p><strong>Phone: </strong>{teacher.phoneNumber}  |  <strong>Email: </strong>{teacher.contactEmail}</p>
      <StarRating value={teacher.avgRating} editable={false} />
      <p>{teacher.bio}</p>
    </>
  )
}