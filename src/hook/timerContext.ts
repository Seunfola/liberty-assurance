'use client';
import { createContext, useContext } from 'react';

export interface TimerContextType {
  timeLeft: number;
  startTimer: () => void;
   pauseTimer: () => void;
}

export const TimerContext = createContext<TimerContextType | null>(null);

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
