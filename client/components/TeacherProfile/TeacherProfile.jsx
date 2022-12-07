import { useState } from "react";
import { Button, Form, Image } from "react-bootstrap";
import { useUserContext } from "../../context/UserContext"
import { FaEdit } from 'react-icons/fa';
import { updateAccount } from "../../services/teacher";
import { getCityFromZipCode } from "../../services/zipcode";
import useTeacherProfile from "../../hooks/useTeacherProfile";
import SubjectList from "../SubjectList/SubjectList";
import styles from './teacherProfile.module.css';

export default function TeacherProfile() {
  const { user } = useUserContext();
  const { teacher, setTeacher, zipCode, setZipCode, stateName, setStateName, cityName, setCityName } = useTeacherProfile(user.teacherId);
  const [userWantsToEditProfile, setUserWantsToEditProfile] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAccount({ ...teacher })
    setUserWantsToEditProfile(false);
  }

  const handleChangeZipCode = async (e) => {
    if (Number(e.target.value) && e.target.value.length === 5) {
      const { city, state } = await getCityFromZipCode(e.target.value);
      if (city && state) {
        setCityName(city);
        setStateName(state);
        setTeacher({ ...teacher, zipCode, city, state })
      }
    }
  }

  return (
    <div style={{ padding: '20px' }}>
    {!userWantsToEditProfile &&
    <div className={styles.profileContainer}>
      <div className={styles.infoContainer}>
      <Button className={styles.editButton} onClick={() => setUserWantsToEditProfile(true)}>
        <FaEdit />
      </Button>
          <Image fluid roundedCircle src={teacher.imageUrl} style={{width: '300px', height: '300px' }}/>
          <div>
            <h1 className={styles.name}>{teacher.firstName} {teacher.lastName}</h1>
            {teacher.city && teacher.state ? 
              <p>{teacher.city}, {teacher.state}</p>
              :
              <p>{teacher.zipCode}</p>
            }
            <p><strong>Phone: </strong>{teacher.phoneNumber}  |  <strong>Email: </strong>{teacher.contactEmail}</p>
          </div>
        </div>
        <div className={styles.detailsContainer}>
        <div>
          <h3>Bio</h3>
          <p>{teacher.bio}</p>
        </div>
      </div>
    </div>
    }
    {userWantsToEditProfile && 
      <>
        <Image roundedCircle src={teacher.imageUrl} style={{ width: '200px', height: '200px' }} />
        <Form onSubmit={handleSubmit}>
          <p>First Name</p>
          <Form.Control type="text" value={teacher.firstName} onChange={(e) => setTeacher({ ...teacher, firstName: e.target.value })}/>
          <p>Last Name</p>
          <Form.Control type="text" value={teacher.lastName} onChange={(e) => setTeacher({ ...teacher, lastName: e.target.value })} />
          <p>Bio</p>
          <Form.Control as="textarea" value={teacher.bio} onChange={(e) => setTeacher({ ...teacher, bio: e.target.value })} />
          <p>Phone Number</p>
          <Form.Control type="text" value={teacher.phoneNumber} onChange={(e) => setTeacher({ ...teacher, phoneNumber: e.target.value })} />
          <p>Contact Email</p>
          <Form.Control type="email" value={teacher.contactEmail} onChange={(e) => setTeacher({ ...teacher, contactEmail: e.target.value })} />
          <p>Zip Code</p>
          <Form.Control type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)} onBlur={handleChangeZipCode}/>
          <p>{cityName}, {stateName}</p>
          <Button type="submit">Save Changes</Button>
        </Form>
      </>
    }
    {teacher.subjects &&
      <SubjectList subjects={teacher.subjects} setTeacher={setTeacher} displayOnly={false} />
    }
    </div>
  )
}