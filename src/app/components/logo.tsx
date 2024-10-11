import React from 'react';
import styles from '@/styles/components/logo.module.scss'; 

const Logo: React.FC = () => {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.innerCircle} />
      <div className={styles.outerCircle} />
    </div>
  );
};

export default Logo;
