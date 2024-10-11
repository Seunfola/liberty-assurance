import React from 'react';
import styles from '@/styles//system-check/page.module.scss';
import SystemInfo from './components/systemInfo';
import SystemIcons from './components/systemIcons';

const SystemCheck: React.FC = () => {
  return (
    <div className={styles.systemCheckContainer}>
      <SystemInfo />
      <div className={styles.systemCheckLayout}>
        <div className={styles.cameraContainer}></div>
        <SystemIcons />
      </div>
      <button className={styles.actionButton}>Take picture and continue</button>
    </div>
  );
};

export default SystemCheck;
