'use client';
import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';
import styles from '@/styles/system-check/systemIcon.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faWifi, faMicrophone, faLightbulb, faCheckCircle } from '@fortawesome/free-solid-svg-icons'; 

interface SystemIconsProps {
  onAllTestsCompleted: (status: boolean) => void;
}

const SystemIcons = forwardRef(({ onAllTestsCompleted }: SystemIconsProps, ref) => {
  const [webcamStatus, setWebcamStatus] = useState<boolean>(false);
  const [wifiStatus, setWifiStatus] = useState<boolean>(false);
  const [micStatus, setMicStatus] = useState<boolean>(false);
  const [lightStatus, setLightStatus] = useState<boolean>(false);
  const [imageCaptured, setImageCaptured] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (webcamStatus && wifiStatus && micStatus && lightStatus) {
      onAllTestsCompleted(true);
    } else {
      onAllTestsCompleted(false);
    }
  }, [webcamStatus, wifiStatus, micStatus, lightStatus, onAllTestsCompleted]);

  const checkWebcam = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setWebcamStatus(true);
      setImageCaptured(false);
    } catch (error) {
      setWebcamStatus(false);
      console.error('Error accessing webcam:', error);
    }
  };

  const captureImage = (): void => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        setImageSrc(imageDataUrl);
        setImageCaptured(true);
      }
    }
  };

  const checkWifi = (): void => setWifiStatus(true);

  const checkMicrophone = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicStatus(true);
      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      setMicStatus(false);
      console.error('Error accessing microphone:', error);
    }
  };

  const checkLighting = (): void => setLightStatus(true);

  useImperativeHandle(ref, () => ({
    captureImage,
  }));

  return (
    <div className={styles.systemIconsContainer}>
      <div className={styles.previewBox}>
        {imageCaptured && imageSrc ? (
          <img src={imageSrc} alt="Captured" className={styles.capturedImage} />
        ) : (
          <video ref={videoRef} className={styles.videoPreview} />
        )}
      </div>
      <div className={styles.iconGrid}>
        <div className={styles.iconCard} onClick={checkWebcam}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon icon={webcamStatus ? faCheckCircle : faVideo} className={styles.icon} />
          </div>
          <p>Webcam</p>
        </div>
        <div className={styles.iconCard} onClick={checkWifi}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon icon={wifiStatus ? faCheckCircle : faWifi} className={styles.icon} />
          </div>
          <p>Speed</p>
        </div>
        <div className={styles.iconCard} onClick={checkMicrophone}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon icon={micStatus ? faCheckCircle : faMicrophone} className={styles.icon} />
          </div>
          <p>Gadget Mic</p>
        </div>
        <div className={styles.iconCard} onClick={checkLighting}>
          <div className={styles.iconCircle}>
            <FontAwesomeIcon icon={lightStatus ? faCheckCircle : faLightbulb} className={styles.icon} />
          </div>
          <p>Lighting</p>
        </div>
      </div>
      <canvas ref={canvasRef} className={styles.hiddenCanvas}></canvas>
    </div>
  );
});

SystemIcons.displayName = 'SystemIcons';

export default SystemIcons;
