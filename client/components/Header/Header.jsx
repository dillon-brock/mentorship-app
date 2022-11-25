import { Button, Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { signOut } from '../../services/auth';

export default function Header() {

  const { method } = useParams();
  const { user, setUser } = useUserContext();

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
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
                      <Nav.Link href='/find-teachers'>Find Teachers</Nav.Link>
                      {user.teacherId ? 
                          <Nav.Link onClick={() => setUser({ ...user, type: 'teacher'})} href='/my-students'>Go To Teacher Profile</Nav.Link>
                          :
                          <Nav.Link href='/add-account'>Create Teacher Profile</Nav.Link>
                      }
                    </>
                  }
                  {user.type == 'teacher' &&
                    <>
                      <Nav.Link href='/my-students'>My Students</Nav.Link>
                      {user.studentId ?
                        <Nav.Link href='/find-teachers'>Go To Student Profile</Nav.Link>
                        :
                        <Nav.Link href='/find-teachers'>Create Student Profile</Nav.Link>
                      }
                    </>
                  }
                  <Nav.Link href='/inbox'>Inbox</Nav.Link>
                  <Button onClick={handleSignOut}>Sign Out</Button>
                </>
              }
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}