import React, { createRef } from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import SystemIcons, { SystemIconsRef } from '../components/systemIcons';

describe('SystemIcons Component', () => {
  let ref: React.MutableRefObject<SystemIconsRef | null>;
  const mockOnAllTestsCompleted = jest.fn();

  beforeEach(() => {
    ref = createRef<SystemIconsRef>();
    jest.clearAllMocks();
  });

  it('renders all system icons', () => {
    render(<SystemIcons onAllTestsCompleted={mockOnAllTestsCompleted} ref={ref} />);
    
    expect(screen.getByText('Webcam')).toBeInTheDocument();
    expect(screen.getByText('Internet Speed')).toBeInTheDocument();
    expect(screen.getByText('Gadget Mic')).toBeInTheDocument();
    expect(screen.getByText('Lighting')).toBeInTheDocument();
  });

  it('captures an image when clicking on the webcam container', async () => {
    render(<SystemIcons onAllTestsCompleted={mockOnAllTestsCompleted} ref={ref} />);

    const webcamContainer = screen.getByRole('img', { hidden: true });

    await fireEvent.click(webcamContainer);
    
    await waitFor(() => {
      expect(mockOnAllTestsCompleted).toHaveBeenCalledWith(false); 
      expect(ref.current?.captureImage).toBeDefined();
    });
  });

  it('starts the webcam on icon click and updates status after capture', async () => {
    render(<SystemIcons onAllTestsCompleted={mockOnAllTestsCompleted} ref={ref} />);

    const webcamIcon = screen.getByText('Webcam');

    fireEvent.click(webcamIcon);

    await waitFor(() => {
      expect(ref.current?.captureImage).toBeDefined();
      expect(screen.getByText('Webcam')).toBeInTheDocument();
    });

    ref.current?.captureImage();
    await waitFor(() => expect(mockOnAllTestsCompleted).toHaveBeenCalledWith(false));
  });

  it('detects microphone input and updates the microphone status', async () => {
    render(<SystemIcons onAllTestsCompleted={mockOnAllTestsCompleted} ref={ref} />);

    const microphoneIcon = screen.getByText('Gadget Mic');

    fireEvent.click(microphoneIcon);

    ref.current?.checkMicrophone();
    await waitFor(() => expect(mockOnAllTestsCompleted).toHaveBeenCalledWith(false));
  });

  it('updates the status for wifi and lighting when clicked', async () => {
    render(<SystemIcons onAllTestsCompleted={mockOnAllTestsCompleted} ref={ref} />);

    const wifiIcon = screen.getByText('Internet Speed');
    const lightingIcon = screen.getByText('Lighting');

    fireEvent.click(wifiIcon);
    fireEvent.click(lightingIcon);

    await waitFor(() => {
      expect(mockOnAllTestsCompleted).not.toHaveBeenCalledWith(true); 
    });
  });

  it('calls onAllTestsCompleted when all tests pass', async () => {
    render(<SystemIcons onAllTestsCompleted={mockOnAllTestsCompleted} ref={ref} />);

    fireEvent.click(screen.getByText('Webcam'));
    fireEvent.click(screen.getByText('Internet Speed'));
    fireEvent.click(screen.getByText('Gadget Mic'));
    fireEvent.click(screen.getByText('Lighting'));

    await waitFor(() => {
      expect(mockOnAllTestsCompleted).toHaveBeenCalledWith(true); 
    });
  });
});
