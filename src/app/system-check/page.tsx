'use client';
import React, { useRef, useState } from 'react';
import styles from '@/styles/system-check/page.module.scss';
import SystemInfo from './components/systemInfo';
import SystemIcons from './components/systemIcons';
import Modal from './components/modal';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';  // Import the Navbar

const SystemCheck: React.FC = () => {
  const systemIconsRef = useRef<{ captureImage: () => void }>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [allTestsCompleted, setAllTestsCompleted] = useState<boolean>(false);
  const [startTimer, setStartTimer] = useState<boolean>(false);  // State to start the timer

  const handleCaptureImage = () => {
    if (!allTestsCompleted) {
      toast.error('Please complete all system tests (Webcam, WiFi, Mic, Lighting) before proceeding.');
      return;
    }

    if (systemIconsRef.current) {
      systemIconsRef.current.captureImage();
    }
    setIsModalOpen(true); // Open the modal after capturing the image
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleProceed = () => {
    setIsModalOpen(false);
    console.log('Proceeding to start the assessment');
    setStartTimer(true);  // Start the timer when the user clicks proceed
  };

  return (
    <div className={styles.systemCheckContainer}>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Include Navbar and pass the startTimer prop */}
      <Navbar startTimer={startTimer} />

      <SystemInfo />
      <div className={styles.systemCheckLayout}>
        <div className={styles.cameraContainer}></div>
        <SystemIcons ref={systemIconsRef} onAllTestsCompleted={setAllTestsCompleted} />
      </div>

      <button
        className={styles.actionButton}
        onClick={handleCaptureImage}
        disabled={!allTestsCompleted}
        style={{
          opacity: allTestsCompleted ? 1 : 0.6, 
          cursor: allTestsCompleted ? 'pointer' : 'not-allowed', 
        }}
      >
        Take picture and continue
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onProceed={handleProceed} />
    </div>
  );
};

export default SystemCheck;