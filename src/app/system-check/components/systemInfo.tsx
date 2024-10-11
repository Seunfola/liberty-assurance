import React from 'react';
import styles from '@/styles/system-check/systemInfo.module.scss';

const SystemInfo: React.FC = () => {
  return (
    <div className={styles.systemInfoContainer}>
      <h2 className={styles.title}>System check</h2>
      <p className={styles.description}>
        We utilize your camera image to ensure fairness for all participants, and we also employ both your camera and microphone for video questions where you will be prompted to record a response using your camera or webcam, so it&apos;s essential to verify that your camera and microphone are functioning correctly and that you have a stable internet connection. Please position yourself in front of your camera, ensuring that your entire face is clearly visible on the screen. You can initiate a 5-second recording of yourself by clicking the button below.
      </p>
    </div>
  );
};

export default SystemInfo;
