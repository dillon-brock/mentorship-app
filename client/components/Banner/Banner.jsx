import styles from './banner.module.css';

export default function Banner() {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.banner}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>App Name</h1>
          <h1 className={styles.subtitle}>This is the motto for the app</h1>
        </div>
      </div>
    </div>
  );
}