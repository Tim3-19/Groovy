import React from 'react';
import './VinylRecord.css';

interface VinylRecordProps {
  isPlaying: boolean;
  coverUrl: string;
}

export const VinylRecord: React.FC<VinylRecordProps> = ({ isPlaying, coverUrl }) => {
  return (
    <div className="vinyl-wrapper">
      <div className={`vinyl ${isPlaying ? 'spinning' : ''}`}>
        <img src={coverUrl} alt="Album cover" className="vinyl-cover" />
      </div>
    </div>
  );
};
