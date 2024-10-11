import React from 'react';
import styles from '@/styles/components/footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.poweredBy}>
        <span className={styles.poweredText}>POWERED BY </span>
        <span className={styles.brand}>Getlinked.AI</span>
      </p>
    </footer>
  );
};

export default Footer;
