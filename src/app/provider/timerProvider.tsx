'use client';
import React, { useState, useEffect, ReactNode, useCallback } from 'react';
import { TimerContext, TimerContextType } from '@/hook/timerContext';

interface TimerProviderProps {
  children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(30 * 60); // 30 minutes
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    if (isRunning && timeRemaining > 0) {
      timerId = setInterval(() => setTimeRemaining((prev) => prev - 1), 1000);
    } else if (timeRemaining === 0) {
      setIsRunning(false); 
    }

    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isRunning, timeRemaining]);

  const startTimer = useCallback(() => {
    if (!isRunning) setIsRunning(true);
  }, [isRunning]);

  const pauseTimer = useCallback(() => {
    if (isRunning) setIsRunning(false);
  }, [isRunning]);

  const contextValue: TimerContextType = {
    timeLeft: timeRemaining,
    startTimer,
    pauseTimer, 
  };

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
};
