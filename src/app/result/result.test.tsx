import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import ResultsPage from './page'; 
import { useSearchParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

describe('ResultsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('renders invalid results when no score and totalQuestions are provided', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    render(<ResultsPage />);

    expect(
      screen.getByText('No results available. Please complete the quiz.')
    ).toBeInTheDocument();
  });

  it('renders results when score and totalQuestions are provided', () => {
    const searchParams = new URLSearchParams();
    searchParams.set('score', '8');
    searchParams.set('totalQuestions', '10');
    (useSearchParams as jest.Mock).mockReturnValue(searchParams);

    render(<ResultsPage />);

    expect(screen.getByText('Quiz Results')).toBeInTheDocument();
    expect(screen.getByText('Your Score: 8 / 10')).toBeInTheDocument();
  });

  it('displays confetti when score is 7 or higher', async () => {
    const searchParams = new URLSearchParams();
    searchParams.set('score', '8');
    searchParams.set('totalQuestions', '10');
    (useSearchParams as jest.Mock).mockReturnValue(searchParams);

    render(<ResultsPage />);

    await waitFor(() =>
      expect(
        screen.getByText('Congratulations! 🎉 You did a great job!')
      ).toBeInTheDocument()
    );
  });

  it('does not display confetti when score is less than 7', () => {
    const searchParams = new URLSearchParams();
    searchParams.set('score', '3');
    searchParams.set('totalQuestions', '10');
    (useSearchParams as jest.Mock).mockReturnValue(searchParams);

    render(<ResultsPage />);

    expect(
      screen.getByText('Better luck next time! Keep practicing!')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Congratulations! 🎉 You did a great job!')
    ).not.toBeInTheDocument();
  });
});
