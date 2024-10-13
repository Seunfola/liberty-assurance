'use client';
import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import styles from '@/styles/system-check/systemIcon.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faVideo, 
  faWifi, 
  faMicrophone, 
  faLightbulb, 
  faCheckCircle 
} from '@fortawesome/free-solid-svg-icons';

interface SystemIconsProps {
  onAllTestsCompleted: (status: boolean) => void;
}

const SystemIcons = forwardRef(({ onAllTestsCompleted }: SystemIconsProps, ref) => {
  const [statuses, setStatuses] = useState({
    webcam: false,
    wifi: false,
    microphone: false,
    lighting: false,
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null); 

  useImperativeHandle(ref, () => ({
    captureImage: () => {
      if (videoRef.current && streamRef.current) {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        }
        console.log('Image captured.');

        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    },
  }));

  useEffect(() => {
    const allChecksPassed = Object.values(statuses).every((status) => status === true);
    onAllTestsCompleted(allChecksPassed);
  }, [statuses, onAllTestsCompleted]);

  const updateStatus = (key: keyof typeof statuses) => {
    setStatuses((prevStatuses) => ({ ...prevStatuses, [key]: true }));
  };

  const checkWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream; 

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      updateStatus('webcam');
    } catch {
      console.error('Error accessing webcam');
    }
  };

  const renderStatusDot = (key: keyof typeof statuses) => {
    const status = statuses[key];
    return status ? (
      <FontAwesomeIcon
        icon={getIcon(key)}
        className={styles.statusIcon}
      />
    ) : (
      <span className={styles.statusDot} />
    );
  };

  const getIcon = (key: keyof typeof statuses) => {
    switch (key) {
      case 'webcam':
        return faVideo;
      case 'wifi':
        return faWifi;
      case 'microphone':
        return faMicrophone;
      case 'lighting':
        return faLightbulb;
      default:
        return faCheckCircle;
    }
  };

  return (
    <div className={styles.systemIconsContainer}>
      <div className={styles.previewBox}>
        <video ref={videoRef} className={styles.videoPreview} />
      </div>

      <div className={styles.iconGrid}>
        <div className={styles.iconCard} onClick={checkWebcam}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon
              icon={statuses.webcam ? faCheckCircle : faVideo}
              className={styles.icon}
            />
          </div>
          <div className={styles.statusDotWrapper}>{renderStatusDot('webcam')}</div>
          <p>Webcam</p>
        </div>

        <div className={styles.iconCard} onClick={() => updateStatus('wifi')}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon
              icon={statuses.wifi ? faCheckCircle : faWifi}
              className={styles.icon}
            />
          </div>
          <div className={styles.statusDotWrapper}>{renderStatusDot('wifi')}</div>
          <p>Internet Speed</p>
        </div>

        <div className={styles.iconCard} onClick={() => updateStatus('microphone')}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon
              icon={statuses.microphone ? faCheckCircle : faMicrophone}
              className={styles.icon}
            />
          </div>
          <div className={styles.statusDotWrapper}>{renderStatusDot('microphone')}</div>
          <p>Gadget Mic</p>
        </div>

        <div className={styles.iconCard} onClick={() => updateStatus('lighting')}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon
              icon={statuses.lighting ? faCheckCircle : faLightbulb}
              className={styles.icon}
            />
          </div>
          <div className={styles.statusDotWrapper}>{renderStatusDot('lighting')}</div>
          <p>Lighting</p>
        </div>
      </div>
    </div>
  );
});

SystemIcons.displayName = 'SystemIcons';
export default SystemIcons;
