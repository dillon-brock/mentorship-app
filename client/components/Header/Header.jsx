import { Button, Container, Image, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { signOut, updateUserType } from '../../services/auth';
import { addStudentAccount } from '../../services/student';
import styles from './header.module.css';

export default function Header() {

  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    setUser(null);
    await signOut();
  }

  const handleCreateStudentProfile = async () => {
    console.log('running profile function');
    const studentInfo = await addStudentAccount({
      firstName: user.firstName,
      lastName: user.lastName,
      imageUrl: user.imageUrl
    });
    await updateUserType('student');
    setUser({ ...user, type: 'student', studentId: studentInfo.id });
    navigate('/find-teachers', {state: { newStudentAccount: true }});
  }

  const handleGoToStudentProfile = async () => {
    await updateUserType('student');
  }

  const handleGoToTeacherProfile = async () => {
    await updateUserType('teacher');
  }

  return (
    <Navbar className={styles.header} variant="light" expand={user ? false : 'xl'}>
      <Container fluid>
        <Navbar.Brand style={{ color: 'black', fontWeight: '700', fontSize: '2rem' }}>App Name</Navbar.Brand>
        {user ?
          <>
            <h4 className={styles.portalTitle}>{user.type == 'student' ? 'Student Portal' : 'Teacher Portal'}</h4>
            <div style={{ display: 'flex', gap: '40px'}}>
              <Link to='/profile'>
                <Image src={user.imageUrl} roundedCircle style={{ width: '70px', height: '70px' }} />
              </Link>
              <Navbar.Toggle style={{ backgroundColor: 'white' }}/>
            </div>
          </>
          :
          <Navbar.Toggle className={styles.navToggle} />
        }
        <Navbar.Offcanvas
          placement="end"
        >
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3" style={{ gap: '24px' }}>
              {!user &&
                <>
                  <Link className={styles.authNavlink} to='/auth/sign-up/student'>Student Sign Up</Link>
                  <Link className={styles.authNavlink} to='/auth/sign-up/teacher'>Teacher Sign Up</Link>
                  <Link className={styles.authNavlink} to='/auth/sign-in'>Log In</Link>
                </>
              }
              {user &&
                <>
                  <Nav.Link className={styles.navLink} href='/profile'>Profile</Nav.Link>
                  {user.type == 'student' &&
                    <>
                      <Nav.Link className={styles.navLink} href='/learning-materials'>Learning Materials</Nav.Link>
                      <Nav.Link className={styles.navLink} href='/find-teachers'>Find Teachers</Nav.Link>
                      {user.teacherId ? 
                          <Nav.Link className={styles.navLink} onClick={handleGoToTeacherProfile} href='/my-students'>Go To Teacher Profile</Nav.Link>
                          :
                          <Nav.Link className={styles.navLink} href='/add-account'>Create Teacher Profile</Nav.Link>
                      }
                    </>
                  }
                  {user.type == 'teacher' &&
                    <>
                      <Nav.Link className={styles.navLink} href='/my-students'>My Students</Nav.Link>
                      <Nav.Link className={styles.navLink} href='/teaching-materials'>Teaching Materials</Nav.Link>
                      {user.studentId ?
                        <Nav.Link className={styles.navLink} onClick={handleGoToStudentProfile} href='/find-teachers'>Go To Student Profile</Nav.Link>
                        :
                        <Nav.Link className={styles.navLink} onClick={handleCreateStudentProfile}>Create Student Profile</Nav.Link>
                      }
                    </>
                  }
                  <Nav.Link className={styles.navLink} href='/inbox'>Inbox</Nav.Link>
                  <Link to='/auth/sign-in'>
                    <Button className={styles.signOutButton} onClick={handleSignOut}>Sign Out</Button>
                  </Link>
                </>
              }
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}