import { Image } from 'react-bootstrap';
import styles from './banner.module.css';
import bannerImage from '../../assets/images/banner_image.png';

export default function Banner() {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.banner}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>SAGA</h1>
          <h1 className={styles.subtitle}>A knowledge hub for everyone.</h1>
        </div>
        <div className={styles.imageContainer}>
          <Image src={bannerImage} className={styles.image} />
        </div>
      </div>
    </div>
  );
}