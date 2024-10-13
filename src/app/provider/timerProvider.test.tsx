import React, { useContext } from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TimerProvider} from './timerProvider';
import { TimerContext, TimerContextType } from '@/hook/timerContext';


const TimerTestComponent = () => {
  const { timeLeft, startTimer, pauseTimer } = useContext(TimerContext) as TimerContextType;

  return (
    <div>
      <span data-testid="time-left">{timeLeft}</span>
      <button onClick={startTimer} data-testid="start-button">Start Timer</button>
      <button onClick={pauseTimer} data-testid="pause-button">Pause Timer</button>
    </div>
  );
};

describe('TimerProvider', () => {
  jest.useFakeTimers(); 

  it('renders with initial time and does not start automatically', () => {
    const { getByTestId } = render(
      <TimerProvider>
        <TimerTestComponent />
      </TimerProvider>
    );

    expect(getByTestId('time-left')).toHaveTextContent('1800'); 
  });

  it('starts the timer when startTimer is called', () => {
    const { getByTestId } = render(
      <TimerProvider>
        <TimerTestComponent />
      </TimerProvider>
    );

    act(() => {
      getByTestId('start-button').click();
      jest.advanceTimersByTime(1000); 
    });

    expect(getByTestId('time-left')).toHaveTextContent('1799'); 
  });

  it('pauses the timer when pauseTimer is called', () => {
    const { getByTestId } = render(
      <TimerProvider>
        <TimerTestComponent />
      </TimerProvider>
    );

    act(() => {
      getByTestId('start-button').click();
      jest.advanceTimersByTime(2000); 
      getByTestId('pause-button').click();
      jest.advanceTimersByTime(2000); 
    });

    expect(getByTestId('time-left')).toHaveTextContent('1798'); 
  });

  it('stops the timer when time reaches 0', () => {
    const { getByTestId } = render(
      <TimerProvider>
        <TimerTestComponent />
      </TimerProvider>
    );

    act(() => {
      getByTestId('start-button').click();
      jest.advanceTimersByTime(1800 * 1000); 
    });

    expect(getByTestId('time-left')).toHaveTextContent('0'); 
  });
});
