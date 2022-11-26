import { useState } from "react";
import { Image } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext"
import { useTeacher } from "../../hooks/useTeacher"

export default function TeacherProfile() {
  const { user } = useUserContext();
  const { teacher } = useTeacher(user.teacherId);
  const [userWantsToEditProfile, setUserWantsToEditProfile] = useState(false);
  const [firstName, setFirstName] = useState(teacher.firstName);
  const [lastName, setLastName] = useState(teacher.lastName);
  const [bio, setBio] = useState(teacher.bio);
  const [phoneNumber, setPhoneNumber] = useState(teacher.phoneNumber);
  const [contactEmail, setContactEmail] = useState(teacher.contactEmail);
  const [zipCode, setZipCode] = useState(teacher.zipCode);
  const [subject, setSubject] = useState(teacher.subject);
  const [city, setCity] = useState(teacher.city);
  const [state, setState] = useState(teacher.state);


  return (
    <>
    {!userWantsToEditProfile &&
      <>
        <Image roundedCircle src={teacher.imageUrl} />
        <p>First Name</p>
        <p>{firstName}</p>
        <p>Last Name</p>
        <p>{lastName}</p>
        <p>Bio</p>
        <p>{bio}</p>
        <p>Phone Number</p>
        <p>{phoneNumber}</p>
        <p>Contact Email</p>
        <p>{contactEmail}</p>
        <p>Subject</p>
        <p>{subject}</p>
        <p>Zip Code</p>
        <p>{zipCode}</p>
        <p>City</p>
        <p>{city} {state}</p>
      </>
    }
    </>
  )
}