import { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { FaEdit } from 'react-icons/fa';
import useStudentProfile from "../../hooks/useStudentProfile"

export default function StudentProfile() {
  const { student, setStudent } = useStudentProfile();
  const [userWantsToEditProfile, setUserWantsToEditProfile] = useState(false);

  const handleSubmit = () => {

  }

  return (
    <>
    {!userWantsToEditProfile &&
      <>
        <Button onClick={() => setUserWantsToEditProfile(true)}>
          <FaEdit />
        </Button>
        <Image roundedCircle src={student.imageUrl} style={{ width: '200px', height: '200px' }} />
        <p>First Name</p>
        <p>{student.firstName}</p>
        <p>Last Name</p>
        <p>{student.lastName}</p>
      </>
    }
    {userWantsToEditProfile &&
      <>
        <Image roundedCircle src={student.imageUrl} style={{ width: '200px', height: '200px' }} />
        <Form onSubmit={handleSubmit}>
          <p>First Name</p>
          <Form.Control type="text" value={student.firstName} onChange={(e) => setStudent({ ...student, firstName: e.target.value })}/>
          <p>Last Name</p>
          <Form.Control type="text" value={student.lastName} onChange={(e) => setStudent({ ...student, lastName: e.target.value })} />
          <Button type="submit">Save Changes</Button>
        </Form>
      </>
    }
    </>
  )
}