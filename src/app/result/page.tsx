'use client';
import { useSearchParams } from 'next/navigation';
import Confetti from 'react-confetti';
import { useEffect, useState } from 'react';
import styles from '@/styles/result/page.module.scss';

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const score = parseInt(searchParams.get('score') || '0');
  const totalQuestions = parseInt(searchParams.get('totalQuestions') || '0');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleResultSetup = () => {
    if (score >= 7) {
      setShowConfetti(true); 
      setMessage('Congratulations! 🎉 You did a great job!');

      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } else {
      setMessage('Better luck next time! Keep practicing!');
    }
  };

  useEffect(() => {
    handleResultSetup();
  }, [score]);

  const renderInvalidResults = () => (
    <p>No results available. Please complete the quiz.</p>
  );

  const renderResults = () => (
    <div className={styles.container}>
      {showConfetti && <Confetti />}
      <h1 className={styles.title}>Quiz Results</h1>
      <p className={styles.result}>
        Your Score: {score} / {totalQuestions}
      </p>
      <p className={styles.message}>{message}</p>
    </div>
  );

  return score && totalQuestions ? renderResults() : renderInvalidResults();
};

export default ResultsPage;
