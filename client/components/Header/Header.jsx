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
    <Navbar variant='light' expand='xl' className="mb-3">
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
                <Button onClick={handleSignOut}>Sign Out</Button>
              }
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}