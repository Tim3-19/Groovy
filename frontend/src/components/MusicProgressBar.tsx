import React from 'react';
import './MusicProgressBar.css';

interface MusicProgressBarProps {
  progress: number;      // 0 to 1
  currentTime: number;   // in seconds
  duration: number;      // in seconds
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
}

// Helper to format seconds into mm:ss (e.g., 65 -> "1:05")
const formatTime = (time: number) => {
  if (!time || isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const MusicProgressBar: React.FC<MusicProgressBarProps> = ({ 
  progress, 
  currentTime, 
  duration, 
  onSeek 
}) => {
  return (
    <div className="progress-wrapper">
      {/* Current Time Label */}
      <span className="time-label">{formatTime(currentTime)}</span>

      {/* The Clickable Track */}
      <div className="progress-track-container" onClick={onSeek}>
        <div className="progress-track-bg">
          <div 
            className="progress-track-fill" 
            style={{ width: `${progress * 100}%` }} 
          >
            {/* The Draggable Thumb/Dot */}
            <div className="progress-thumb"></div>
          </div>
        </div>
      </div>

      {/* Total Duration Label */}
      <span className="time-label">{formatTime(duration)}</span>
    </div>
  );
};