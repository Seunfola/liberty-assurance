'use client';

import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect, MutableRefObject } from 'react';
import styles from '@/styles/system-check/systemIcon.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faWifi, faMicrophone, faLightbulb, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast'; 

export interface SystemIconsRef {
  captureImage: () => void;
  checkMicrophone: () => void;
}

interface SystemIconsProps {
  onAllTestsCompleted: (status: boolean) => void;
}

const SystemIcons = forwardRef<SystemIconsRef, SystemIconsProps>(({ onAllTestsCompleted }, ref) => {
  const [statuses, setStatuses] = useState({
    webcam: false,
    wifi: false,
    microphone: false,
    lighting: false,
  });

  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const microphoneStreamRef = useRef<MediaStream | null>(null);
  const [isWebcamActive, setIsWebcamActive] = useState<boolean>(false);

  useImperativeHandle(ref, () => ({
    captureImage: handleCaptureImage,
    checkMicrophone: startMicrophoneTest,
  }));

  const updateStatus = (key: keyof typeof statuses) => {
    setStatuses((prevStatuses) => ({ ...prevStatuses, [key]: true }));
  };

  const handleCaptureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (context && video.videoWidth > 0 && video.videoHeight > 0) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = canvas.toDataURL('image/png');
        setCapturedImage(imageData);
        console.log('Image captured.');

        stopWebcam();
        updateStatus('webcam');
      } else {
        console.warn('Video not ready for capture.');
      }
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsWebcamActive(true);

        toast('Click on the image to save your picture.');
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const stopWebcam = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setIsWebcamActive(false);
    }
  };

  const startMicrophoneTest = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      microphoneStreamRef.current = stream;
      audioContextRef.current = new AudioContext();

      const analyser = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);

      source.connect(analyser);
      analyser.fftSize = 256;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const detectSound = () => {
        analyser.getByteFrequencyData(dataArray);
        const soundDetected = dataArray.some((value) => value > 50); 

        if (soundDetected) {
          console.log('Microphone is working.');
          updateStatus('microphone');
          stopMicrophoneTest();
        } else {
          requestAnimationFrame(detectSound);
        }
      };

      detectSound();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopMicrophoneTest = () => {
    microphoneStreamRef.current?.getTracks().forEach((track) => track.stop());
    audioContextRef.current?.close();
  };

  const handleWebcamClick = async () => {
    if (isWebcamActive) {
      (ref as MutableRefObject<SystemIconsRef>).current?.captureImage();
    } else {
      await startWebcam();
    }
  };

  const renderStatusDot = (key: keyof typeof statuses) => (
    statuses[key] ? (
      <FontAwesomeIcon icon={getIcon(key)} className={styles.statusIcon} />
    ) : (
      <span className={styles.statusDot} />
    )
  );

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

  useEffect(() => {
    const allChecksPassed = Object.values(statuses).every((status) => status === true);
    onAllTestsCompleted(allChecksPassed);
  }, [statuses, onAllTestsCompleted]);

  return (
    <div className={styles.systemIconsContainer}>
      <Toaster position="bottom-center" reverseOrder={false} /> 
      <div className={styles.previewBox} onClick={handleWebcamClick}>
        {capturedImage ? (
          <img src={capturedImage} alt="Captured" className={styles.capturedImage} />
        ) : (
          <video ref={videoRef} className={styles.videoPreview} />
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      <div className={styles.iconGrid}>
        <div className={styles.iconCard} onClick={handleWebcamClick}>
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

        <div className={styles.iconCard} onClick={() => (ref as MutableRefObject<SystemIconsRef>).current?.checkMicrophone()}>
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
