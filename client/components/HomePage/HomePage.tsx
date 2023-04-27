import { Link } from 'react-router-dom';
import Banner from '../Banner/Banner';
import Header from '../Header/Header';
import StartLink from '../StartLink/StartLink';
import styles from './homePage.module.css';

export default function HomePage() {
  return (
    <>
      <Header/>
      <Banner/>
      <div className={styles.linksContainer}>
        <div className={styles.linkContainer}>
          <Link to='/auth/sign-up/student' className={styles.link}>
            <StartLink type='learn' />
          </Link>
        </div>
        <div className={styles.linkContainer}>
          <Link to='/auth/sign-up/teacher' className={styles.link}>
            <StartLink type='teach' />
          </Link>
        </div>
        <div className={styles.linkContainer}>
          <Link to='/find-teachers' className={styles.link}>
            <StartLink type='' />
          </Link>
        </div>
      </div>
    </>
  );
}