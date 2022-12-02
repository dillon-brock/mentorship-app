import { Button, Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { signOut, updateUserType } from '../../services/auth';
import { addStudentAccount } from '../../services/student';

export default function Header() {

  const { method } = useParams();
  const { user, setUser } = useUserContext();
  const handleSignOut = async () => {
    setUser(null);
    await signOut();
  }

  const handleCreateStudentProfile = async () => {
    const studentInfo = await addStudentAccount({ firstName: user.firstName, lastName: user.lastName, imageUrl: user.imageUrl });
    setUser({ ...user, type: 'student', studentId: studentInfo.id });
  }

  const handleGoToStudentProfile = async () => {
    await updateUserType('student');
  }

  const handleGoToTeacherProfile = async () => {
    await updateUserType('teacher');
  }

  return (
    <Navbar variant='light' expand={user ? false : 'xl'} className="mb-3">
      <Container fluid>
        <Navbar.Brand href="#">App Name</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Offcanvas
          placement="end"
        >
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3" style={{ gap: '24px' }}>
              {!user &&
                <>
                  <Nav.Link href='/auth/sign-up/student'>Student Sign Up</Nav.Link>
                  <Nav.Link href='/auth/sign-up/teacher'>Teacher Sign Up</Nav.Link>
                  <Nav.Link href='/auth/sign-in'>Log In</Nav.Link>
                </>
              }
              {user &&
                <>
                  <Nav.Link href='/profile'>Profile</Nav.Link>
                  {user.type == 'student' &&
                    <>
                      <Nav.Link href='/learning-materials'>Learning Materials</Nav.Link>
                      <Nav.Link href='/find-teachers'>Find Teachers</Nav.Link>
                      {user.teacherId ? 
                          <Nav.Link onClick={handleGoToTeacherProfile} href='/my-students'>Go To Teacher Profile</Nav.Link>
                          :
                          <Nav.Link href='/add-account'>Create Teacher Profile</Nav.Link>
                      }
                    </>
                  }
                  {user.type == 'teacher' &&
                    <>
                      <Nav.Link href='/my-students'>My Students</Nav.Link>
                      <Nav.Link href='/teaching-materials'>Teaching Materials</Nav.Link>
                      {user.studentId ?
                        <Nav.Link onClick={handleGoToStudentProfile} href='/find-teachers'>Go To Student Profile</Nav.Link>
                        :
                        <Nav.Link onClick={handleCreateStudentProfile} href='/find-teachers'>Create Student Profile</Nav.Link>
                      }
                    </>
                  }
                  <Nav.Link href='/inbox'>Inbox</Nav.Link>
                  <Link to='/auth/sign-in'>
                    <Button onClick={handleSignOut}>Sign Out</Button>
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