'use client'; 
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

import { faSpinner } from '@fortawesome/free-solid-svg-icons'; 

const ResultsPage = () => {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  
  
  useEffect(() => {
    if (router.query.score && router.query.totalQuestions) {
      setScore(parseInt(router.query.score as string, 10));
      setTotalQuestions(parseInt(router.query.totalQuestions as string, 10));
    }
  }, [router.query]);

  return (
    <div>
      <h1>Quiz Results</h1>
      {score !== null ? (
        <h2>
          Your Score: {score}/{totalQuestions}
        </h2>
      ) : (
        <div>
          <FontAwesomeIcon icon={faSpinner} spin size="2x" />
          <p>Loading results...</p>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;