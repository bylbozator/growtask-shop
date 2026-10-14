import styles from './Footer.module.scss';

// Подвал сайта: копирайт и плашка студии. Одинаков на всех страницах.
export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.line} />
        <div className={styles.bottom}>
          <span className={styles.copyright}>@ Company name 2026</span>

          <div className={styles.madeIn}>
            <span className={styles.flag} />
            <span className={styles.madeText}>
              <span className={styles.madeLabel}>Сайт сделан в студии</span>
              <span className={styles.logo}>growtask</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
