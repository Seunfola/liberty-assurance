'use client';

import { useSearchParams } from 'next/navigation';
import Confetti from 'react-confetti';
import { useEffect, useState, useCallback, Suspense } from 'react';
import styles from '@/styles/result/page.module.scss';

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const [score, setScore] = useState<number | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleResultSetup = useCallback(() => {
    if (score !== null && score >= 7) {
      setShowConfetti(true);
      setMessage('Congratulations! 🎉 You did a great job!');

      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    } else {
      setMessage('Better luck next time! Keep practicing!');
    }
  }, [score]);

  useEffect(() => {
    const scoreParam = parseInt(searchParams.get('score') || '0', 10);
    const totalQuestionsParam = parseInt(searchParams.get('totalQuestions') || '0', 10);

    setScore(scoreParam);
    setTotalQuestions(totalQuestionsParam);
  }, [searchParams]);

  useEffect(() => {
    if (score !== null) {
      handleResultSetup();
    }
  }, [score, handleResultSetup]); 

  if (score === null || totalQuestions === null) {
    return <p>No results available. Please complete the quiz.</p>;
  }

  return (
    <div className={styles.container}>
      {showConfetti && <Confetti />}
      <h1 className={styles.title}>Quiz Results</h1>
      <p className={styles.result}>
        Your Score: {score} / {totalQuestions}
      </p>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default function ResultsPageWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ResultsPage />
    </Suspense>
  );
}
