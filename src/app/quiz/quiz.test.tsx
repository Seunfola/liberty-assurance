import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizComponent from './page'; 
import { useRouter } from 'next/navigation';
import { useTimer } from '@/hook/timerContext';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hook/timerContext', () => ({
  useTimer: jest.fn(),
}));

const mockQuestions = [
  {
    question: 'What is 2 + 2?',
    options: { a: '3', b: '4', c: '5' },
    correctAnswer: 'b',
  },
  {
    question: 'What is the capital of France?',
    options: { a: 'Paris', b: 'Berlin', c: 'Madrid' },
    correctAnswer: 'a',
  },
];

jest.mock('@/data/question', () => ({
  questions: mockQuestions,
}));

describe('QuizComponent', () => {
  const mockRouterPush = jest.fn();
  const mockPauseTimer = jest.fn();
  const mockUseTimer = {
    timeLeft: 60,
    pauseTimer: mockPauseTimer,
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
    (useTimer as jest.Mock).mockReturnValue(mockUseTimer);
    jest.clearAllMocks(); 
  });

  it('renders the quiz title and questions', () => {
    render(<QuizComponent />);
    expect(screen.getByText('Quiz')).toBeInTheDocument();
    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
    expect(screen.getByText('What is the capital of France?')).toBeInTheDocument();
  });

  it('updates the answer when a radio button is selected', () => {
    render(<QuizComponent />);

    const radioButton = screen.getByLabelText('4');
    fireEvent.click(radioButton);

    expect(radioButton).toBeChecked();
  });

  it('submits the quiz and pauses the timer', () => {
    render(<QuizComponent />);

    const radioButton = screen.getByLabelText('4');
    fireEvent.click(radioButton);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(mockPauseTimer).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith('/result?score=1&totalQuestions=2');
  });

  it('automatically submits the quiz when the timer reaches 0', async () => {
    (useTimer as jest.Mock).mockReturnValue({ ...mockUseTimer, timeLeft: 0 });

    render(<QuizComponent />);

    await waitFor(() =>
      expect(mockRouterPush).toHaveBeenCalledWith('/result?score=0&totalQuestions=2')
    );
  });
});
