import React, { useRef } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SystemIcons from './systemIcons';

Object.defineProperty(global.navigator, 'mediaDevices', {
  value: {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }],
    }),
  },
});

describe('SystemIcons Component', () => {
  const mockOnAllTestsCompleted = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it('renders all system icons and status dots initially', () => {
    render(<SystemIcons onAllTestsCompleted={mockOnAllTestsCompleted} />);

    expect(screen.getByText('Webcam')).toBeInTheDocument();
    expect(screen.getByText('Internet Speed')).toBeInTheDocument();
    expect(screen.getByText('Gadget Mic')).toBeInTheDocument();
    expect(screen.getByText('Lighting')).toBeInTheDocument();

    expect(screen.getAllByRole('status').length).toBe(4); 
  });

  it('updates webcam status and video stream plays', async () => {
    render(<SystemIcons onAllTestsCompleted={mockOnAllTestsCompleted} />);

    const webcamButton = screen.getByText('Webcam');
    fireEvent.click(webcamButton);

    await waitFor(() => {
      expect(navigator.mediaDevices.getUserMedia).toHaveBeenCalledWith({ video: true });
    });

    expect(mockOnAllTestsCompleted).not.toHaveBeenCalled(); 
    expect(screen.getByRole('status', { name: /fa-video/i })).toBeInTheDocument();
  });

  it('stops the webcam stream after capturing an image', async () => {
    const systemIconsRef = useRef<{ captureImage: () => void }>(null);

    render(<SystemIcons ref={systemIconsRef} onAllTestsCompleted={mockOnAllTestsCompleted} />);

    fireEvent.click(screen.getByText('Webcam'));

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });

    systemIconsRef.current?.captureImage();

    await waitFor(() => {
      stream.getTracks().forEach((track) => track.stop()); 
    });

    expect(mockOnAllTestsCompleted).not.toHaveBeenCalled(); 
  });

  it('calls onAllTestsCompleted when all tests are passed', async () => {
    render(<SystemIcons onAllTestsCompleted={mockOnAllTestsCompleted} />);

    fireEvent.click(screen.getByText('Webcam'));
    fireEvent.click(screen.getByText('Internet Speed'));
    fireEvent.click(screen.getByText('Gadget Mic'));
    fireEvent.click(screen.getByText('Lighting'));

    await waitFor(() => {
      expect(mockOnAllTestsCompleted).toHaveBeenCalledWith(true); 
    });
  });

  it('does not call onAllTestsCompleted if not all tests are passed', async () => {
    render(<SystemIcons onAllTestsCompleted={mockOnAllTestsCompleted} />);

    fireEvent.click(screen.getByText('Webcam'));
    fireEvent.click(screen.getByText('Internet Speed')); 

    await waitFor(() => {
      expect(mockOnAllTestsCompleted).not.toHaveBeenCalledWith(true);
    });
  });
});
