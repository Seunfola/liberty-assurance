import React from 'react';
import styles from '@/styles/system-check/systemIcon.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faWifi, faMicrophone, faLightbulb } from '@fortawesome/free-solid-svg-icons'; 

const SystemIcons: React.FC = () => {
  return (
    <div className={styles.systemIconsContainer}>
      <div className={styles.cameraContainer}></div>
      <div className={styles.iconGrid}>
        <div className={styles.iconCard}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon icon={faVideo} className={styles.icon} />
          </div>
          <p>Webcam</p>
          <span className={styles.statusDot}></span>
        </div>
        <div className={styles.iconCard}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon icon={faWifi} className={styles.icon} />
          </div>
          <p>Speed</p>
          <span className={styles.statusDot}></span>
        </div>
        <div className={styles.iconCard}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon icon={faMicrophone} className={styles.icon} />
          </div>
          <p>Gadget mic</p>
          <span className={styles.statusDot}></span>
        </div>
        <div className={styles.iconCard}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon icon={faLightbulb} className={styles.icon} />
          </div>
          <p>Lighting</p>
          <span className={styles.statusDot}></span>
        </div>
      </div>
    </div>
  );
};

export default SystemIcons;
