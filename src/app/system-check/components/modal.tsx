'use client';
import React from 'react';
import styles from '@/styles/system-check/modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void; 
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onProceed }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Start assessment</h3>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
        <div className={styles.modalBody}>
          <p>Proceed to start assessment</p>
          <p>
            Kindly keep to the rules of the assessment and sit up, stay in front of your camera/webcam, and start your
            assessment.
          </p>
        </div>
        <div className={styles.modalFooter}>
          <button className={styles.proceedButton} onClick={onProceed}>
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
