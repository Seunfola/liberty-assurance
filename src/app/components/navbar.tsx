import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEye } from '@fortawesome/free-solid-svg-icons'; 
import Logo from './Logo';
import styles from '@/styles/components/navbar.module.scss';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div className={styles.logoContainer}>
          <Logo />
          <div className={styles.navText}>
            <h1>Frontend Developer</h1>
            <p>Skill assessment test</p>
          </div>
        </div>
        <div className={styles.timeContainer}>
          <div className={styles.timer}>
            <FontAwesomeIcon icon={faClock} className={styles.icon} />
            <p><strong>29:10</strong> time left</p>
          </div>
          <button className={styles.viewButton}>
            <FontAwesomeIcon icon={faEye} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
