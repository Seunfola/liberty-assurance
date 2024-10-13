'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faEye } from '@fortawesome/free-solid-svg-icons'; 
import { useRouter } from 'next/navigation';
import styles from '@/styles/components/navbar.module.scss';
import Logo from './logo';
import { useTimer } from '@/hook/timerContext';

const Navbar: React.FC = () => {
  const { timeLeft } = useTimer();
  const router = useRouter();

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        <div
          className={styles.logoContainer}
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        >
          <Logo />
          <div className={styles.navText}>
            <h1>Frontend Developer</h1>
            <p>Skill assessment test</p>
          </div>
        </div>
        <div className={styles.timeContainer}>
          <div className={styles.timer}>
            <FontAwesomeIcon icon={faStopwatch} className={styles.icon} /> 
            <p>
              <strong>{formatTime(timeLeft)}</strong> time left
            </p>
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
