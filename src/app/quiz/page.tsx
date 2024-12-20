'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { questions, Question } from '@/data/question';
import styles from '@/styles/quiz/page.module.scss';
import { useTimer } from '@/hook/timerContext';

const QuizComponent = () => {
  const router = useRouter();
  const { timeLeft, pauseTimer } = useTimer();

  const [userAnswers, setUserAnswers] = useState<{ [key: number]: keyof Question['options'] }>({});

  const handleAnswerChange = (questionIndex: number, selectedOption: keyof Question['options']) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: selectedOption });
  };

  const handleSubmit = useCallback(() => {
    pauseTimer();

    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });

    router.push(`/result?score=${score}&totalQuestions=${questions.length}`);
  }, [pauseTimer, router, userAnswers]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleSubmit(); 
    }
  }, [timeLeft, handleSubmit]); 

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Quiz</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {questions.map((question: Question, index: number) => (
          <div key={index} className={styles.questionCard}>
            <h3>{question.question}</h3>
            {Object.entries(question.options).map(([key, option]) => (
              <label key={key} className={styles.optionLabel}>
                <input
                  type="radio"
                  name={`question-${index}`}
                  value={key}
                  checked={userAnswers[index] === key}
                  onChange={() => handleAnswerChange(index, key as keyof Question['options'])}
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuizComponent;
