import { Link } from 'react-router-dom';
import Banner from '../Banner/Banner';
import Header from '../Header/Header';
import StartLink from '../StartLink/StartLink';
import { Container } from 'react-bootstrap';

export default function HomePage() {
  return (
    <>
      <Header/>
      <Banner/>
      <Container className="d-flex justify-content-around">
        <Link to='/auth/sign-up/student' style={{ textDecoration: 'none', width: '25%' }}>
          <StartLink type='learn' />
        </Link>
        <Link to='/auth/sign-up/teacher' style={{ textDecoration: 'none', width: '25%' }}>
          <StartLink type='teach' />
        </Link>
        <Link to='/find-teachers' style={{ textDecoration: 'none', width: '25%' }}>
          <StartLink />
        </Link>
      </Container>
    </>
  );
}