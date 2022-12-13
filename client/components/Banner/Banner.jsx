import styles from './banner.module.css';

export default function Banner() {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.banner}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>SAGA</h1>
          <h1 className={styles.subtitle}>A knowledge hub for everyone.</h1>
        </div>
      </div>
    </div>
  );
}