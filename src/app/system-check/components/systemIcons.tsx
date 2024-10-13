'use client';
import React, { useState, useRef, useEffect } from 'react';
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

const SystemIcons = React.forwardRef(({ onAllTestsCompleted }: SystemIconsProps, ref) => {
  const [statuses, setStatuses] = useState({
    webcam: false,
    wifi: false,
    microphone: false,
    lighting: false,
  });

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const allChecksPassed = Object.values(statuses).every((status) => status === true);
    onAllTestsCompleted(allChecksPassed);
  }, [statuses, onAllTestsCompleted]);

  const updateStatus = (key: keyof typeof statuses) => {
    setStatuses((prevStatuses) => ({ ...prevStatuses, [key]: true }));
  };

  const takePicture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = videoRef.current;

      if (video) {
        video.srcObject = stream;
        await video.play();
        await new Promise((resolve) => setTimeout(resolve, 500));

        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext('2d');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context?.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = canvas.toDataURL('image/png');
          setCapturedImage(imageData);
        }

        stream.getTracks().forEach((track) => track.stop());
        updateStatus('webcam');
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const renderStatusDot = (key: keyof typeof statuses) => {
    const status = statuses[key];
    return status ? (
      <FontAwesomeIcon icon={getIcon(key)} className={styles.statusIcon} />
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
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className={styles.capturedImage} />
        ) : (
          <video ref={videoRef} className={styles.videoPreview} />
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      <div className={styles.iconGrid}>
        <div className={styles.iconCard} onClick={takePicture}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon icon={statuses.webcam ? faCheckCircle : faVideo} className={styles.icon} />
          </div>
          <div className={styles.statusDotWrapper}>{renderStatusDot('webcam')}</div>
          <p>Webcam</p>
        </div>

        <div className={styles.iconCard} onClick={() => updateStatus('wifi')}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon icon={statuses.wifi ? faCheckCircle : faWifi} className={styles.icon} />
          </div>
          <div className={styles.statusDotWrapper}>{renderStatusDot('wifi')}</div>
          <p>Internet Speed</p>
        </div>

        <div className={styles.iconCard} onClick={() => updateStatus('microphone')}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon icon={statuses.microphone ? faCheckCircle : faMicrophone} className={styles.icon} />
          </div>
          <div className={styles.statusDotWrapper}>{renderStatusDot('microphone')}</div>
          <p>Gadget Mic</p>
        </div>

        <div className={styles.iconCard} onClick={() => updateStatus('lighting')}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon icon={statuses.lighting ? faCheckCircle : faLightbulb} className={styles.icon} />
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