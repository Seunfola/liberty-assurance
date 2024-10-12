'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; 
import { questions, Question } from "./questions"; 

const QuizComponent = () => {
  const router = useRouter(); 

  const [userAnswers, setUserAnswers] = useState<{ [key: number]: keyof Question["options"] }>({});
  const [timeLeft, setTimeLeft] = useState(60); 

  const handleAnswerChange = (questionIndex: number, selectedOption: keyof Question["options"]) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: selectedOption,
    });
  };

  // Calculate score and navigate to results page
  const handleSubmit = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        score++;
      }
    });

    
    router.push({
      pathname: '/results',
      query: {
        score: score.toString(),
        totalQuestions: questions.length.toString(),
      },
    });
  };

  // Timer functionality (optional)
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer); 
    } else {
      handleSubmit(); 
    }
  }, [timeLeft]);

  return (
    <div>
      <h1>Quiz</h1>
      {timeLeft > 0 && (
        <p>Time remaining: {timeLeft} seconds</p>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {questions.map((question: Question, index: number) => (
          <div key={index}>
            <h3>{question.question}</h3>
            {Object.entries(question.options).map(([key, option]) => (
              <div key={key}>
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={key}
                    checked={userAnswers[index] === key}
                    onChange={() => handleAnswerChange(index, key as keyof Question["options"])}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default QuizComponent;