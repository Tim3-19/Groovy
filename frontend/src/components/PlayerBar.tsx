import React from 'react';
import './PlayerBar.css';
import type { Song } from '../data/mockData';
import { MusicProgressBar } from './MusicProgressBar';

interface PlayerBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  progress: number;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  onCoverClick: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  likedSongs: string[];
  onToggleLike: (songId: string) => void;
  isShuffle: boolean;
  onToggleShuffle: () => void;
  isRepeat: boolean;
  onToggleRepeat: () => void;
}

export const PlayerBar: React.FC<PlayerBarProps> = ({
  currentSong,
  isPlaying,
  progress,
  currentTime,
  duration,
  onTogglePlay,
  onPrev,
  onNext,
  onSeek,
  onCoverClick,
  volume,
  onVolumeChange,
  likedSongs,
  onToggleLike,
  isShuffle,
  onToggleShuffle,
  isRepeat,
  onToggleRepeat
}) => {
  const isLiked = currentSong ? likedSongs.includes(currentSong.id) : false;

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.min(Math.max(clickX / rect.width, 0), 1);
    onVolumeChange(newVolume);
  };

  const getVolumeIcon = () => {
    if (volume === 0) return 'volume_off';
    if (volume < 0.4) return 'volume_down';
    return 'volume_up';
  };

  const handleMuteToggle = () => {
    if (volume > 0) {
      onVolumeChange(0);
    } else {
      onVolumeChange(0.5); // restore to 50%
    }
  };

  if (!currentSong) return null;

  return (
    <footer className="player-bar">
      {/* 1. Now Playing Info (Left) */}
      <div className="player-track-info">
        <div className="player-track-cover" onClick={onCoverClick} title="Open Vinyl Player">
          <img src={currentSong.cover_url} alt={currentSong.title} />
        </div>
        <div className="player-track-meta">
          <div className="player-track-title" onClick={onCoverClick} title="Open Vinyl Player">
            {currentSong.title}
          </div>
          <p className="player-track-artist">{currentSong.artist}</p>
        </div>
        <button 
          className={`player-like-btn ${isLiked ? 'liked' : ''}`}
          onClick={() => onToggleLike(currentSong.id)}
          title={isLiked ? "Unlike Song" : "Like Song"}
        >
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>

      {/* 2. Playback Controls & Progress Bar (Center) */}
      <div className="player-controls-container">
        <div className="player-buttons">
          <button 
            className={`player-btn ${isShuffle ? 'active' : ''}`}
            onClick={onToggleShuffle}
            title="Shuffle"
          >
            <span className="material-symbols-outlined">shuffle</span>
          </button>
          
          <button className="player-btn" onClick={onPrev} title="Previous">
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>skip_previous</span>
          </button>
          
          <button className="player-btn play-btn" onClick={onTogglePlay} title={isPlaying ? "Pause" : "Play"}>
            <span className="material-symbols-outlined">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          
          <button className="player-btn" onClick={onNext} title="Next">
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>skip_next</span>
          </button>
          
          <button 
            className={`player-btn ${isRepeat ? 'active' : ''}`}
            onClick={onToggleRepeat}
            title="Repeat"
          >
            <span className="material-symbols-outlined">repeat</span>
          </button>
        </div>

        {/* Progress Slider */}
        <div className="player-timeline">
          <MusicProgressBar 
            progress={progress} 
            currentTime={currentTime} 
            duration={duration} 
            onSeek={onSeek} 
          />
        </div>
      </div>

      {/* 3. Utility Controls (Right) */}
      <div className="player-utilities">
        <button className="player-utility-btn" onClick={() => alert('Lyrics feature coming soon!')} title="Lyrics">
          <span className="material-symbols-outlined">lyrics</span>
        </button>
        <button className="player-utility-btn" onClick={() => alert('Queue details coming soon!')} title="Queue">
          <span className="material-symbols-outlined">queue_music</span>
        </button>
        <button className="player-utility-btn" onClick={() => alert('Device connection details coming soon!')} title="Devices">
          <span className="material-symbols-outlined">devices</span>
        </button>
        
        {/* volume slider */}
        <div className="player-volume-container">
          <button className="player-utility-btn" onClick={handleMuteToggle} title="Mute/Unmute">
            <span className="material-symbols-outlined">{getVolumeIcon()}</span>
          </button>
          <div className="player-volume-slider-wrapper" onClick={handleVolumeClick} title="Set Volume">
            <div className="player-volume-fill" style={{ width: `${volume * 100}%` }}></div>
          </div>
        </div>

        <button className="player-utility-btn" onClick={onCoverClick} title="Expand player to Fullscreen">
          <span className="material-symbols-outlined">open_in_full</span>
        </button>
      </div>
    </footer>
  );
};
