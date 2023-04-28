import { Button, Container, Image, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { User, useUserContext } from '../../context/UserContext';
import { signOut, updateUserType } from '../../services/auth/auth';
import { addStudentAccount } from '../../services/student/student';
import styles from './header.module.css';

export default function Header() {

  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    setUser(null);
    await signOut();
  }

  const handleCreateStudentProfile = async () => {
    const studentInfo = await addStudentAccount({
      firstName: user?.firstName as string,
      lastName: user?.lastName as string,
      imageUrl: user?.imageUrl as string
    });
    await updateUserType('student');
    setUser(prev => ({ ...(prev as User), type: 'student', studentId: studentInfo.id }));
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
        <Link to='/' style={{ textDecoration: 'none' }}>
          <Navbar.Brand style={{ color: 'black', fontWeight: '700', fontSize: '2rem', borderBottom: '2px solid black' }}>SAGA</Navbar.Brand>
        </Link>
        {user ?
          <>
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
                  <Link className={styles.navLink} style={{ marginTop: '20px' }} to='/profile'>Profile</Link>
                  {user.type == 'student' &&
                    <>
                      <Link className={styles.navLink} to='/learning-materials'>Learning Materials</Link>
                      <Link className={styles.navLink} to='/find-teachers'>Find Teachers</Link>
                      {user.teacherId ? 
                          <a className={styles.navLink} onClick={handleGoToTeacherProfile} href='/my-students'>Go To Teacher Profile</a>
                          :
                          <Link className={styles.navLink} to='/add-account'>Create Teacher Profile</Link>
                      }
                    </>
                  }
                  {user.type == 'teacher' &&
                    <>
                      <Link className={styles.navLink} to='/my-students'>My Students</Link>
                      <Link className={styles.navLink} to='/teaching-materials'>Teaching Materials</Link>
                      {user.studentId ?
                        <a className={styles.navLink} onClick={handleGoToStudentProfile} href='/find-teachers'>Go To Student Profile</a>
                        :
                        <a className={styles.navLink} onClick={handleCreateStudentProfile}>Create Student Profile</a>
                      }
                    </>
                  }
                  <Link className={styles.navLink} to='/inbox'>Inbox</Link>
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