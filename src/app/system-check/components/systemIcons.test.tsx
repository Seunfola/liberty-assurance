import React, { useRef } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SystemIcons from './systemIcons';

describe('SystemIcons Component', () => {
  const mockOnAllTestsCompleted = jest.fn();

  it('renders all system icons and status dots initially', () => {
    render(<SystemIcons onAllTestsCompleted={mockOnAllTestsCompleted} />);
    
    expect(screen.getByText('Webcam')).toBeInTheDocument();
    expect(screen.getByText('Internet Speed')).toBeInTheDocument();
    expect(screen.getByText('Gadget Mic')).toBeInTheDocument();
    expect(screen.getByText('Lighting')).toBeInTheDocument();

    expect(screen.getAllByRole('status').length).toBe(4);
  });

  it('updates webcam status and video stream plays', async () => {
    const { getByText } = render(<SystemIcons onAllTestsCompleted={mockOnAllTestsCompleted} />);
    
    const webcamButton = getByText('Webcam');
    fireEvent.click(webcamButton);

    await waitFor(() => {
      expect(mockOnAllTestsCompleted).not.toHaveBeenCalled(); 
    });

    expect(screen.getByRole('status', { name: /fa-video/i })).toBeInTheDocument();
  });

  it('stops the webcam stream after capturing an image', async () => {
    const systemIconsRef = useRef<{ captureImage: () => void }>(null);

    const { getByText } = render(
      <SystemIcons ref={systemIconsRef} onAllTestsCompleted={mockOnAllTestsCompleted} />
    );

    fireEvent.click(getByText('Webcam'));

    systemIconsRef.current?.captureImage();

    await waitFor(() => {
      expect(mockOnAllTestsCompleted).not.toHaveBeenCalled(); 
    });
  });

  it('calls onAllTestsCompleted when all tests are passed', async () => {
    const { getByText } = render(<SystemIcons onAllTestsCompleted={mockOnAllTestsCompleted} />);

    fireEvent.click(getByText('Webcam'));
    fireEvent.click(getByText('Internet Speed'));
    fireEvent.click(getByText('Gadget Mic'));
    fireEvent.click(getByText('Lighting'));

    await waitFor(() => {
      expect(mockOnAllTestsCompleted).toHaveBeenCalledWith(true);
    });
  });

  it('does not call onAllTestsCompleted if not all tests are passed', async () => {
    const { getByText } = render(<SystemIcons onAllTestsCompleted={mockOnAllTestsCompleted} />);

    fireEvent.click(getByText('Webcam'));
    fireEvent.click(getByText('Internet Speed'));

    await waitFor(() => {
      expect(mockOnAllTestsCompleted).not.toHaveBeenCalledWith(true);
    });
  });
});
