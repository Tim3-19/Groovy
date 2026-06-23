import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';
import type { Song } from '../data/mockData';

interface NavBarProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onCoverClick: () => void;
  likedSongs: string[];
  onToggleLike: (songId: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({
  currentSong,
  isPlaying,
  onTogglePlay,
  onCoverClick,
  likedSongs,
  onToggleLike
}) => {
  const isLiked = currentSong ? likedSongs.includes(currentSong.id) : false;

  return (
    <aside className="sidebar">
      {/* Brand Logo */}
      <div className="sidebar-logo">
        <h1>Pure Fire</h1>
      </div>

      {/* Discover Section */}
      <div className="sidebar-section" style={{ marginTop: 0 }}>
        <div className="sidebar-section-header">
          <span>Discover</span>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/" className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`} end>
            <span className="material-symbols-outlined">home</span>
            <span>Home</span>
          </NavLink>
          
          <NavLink to="/search" className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}>
            <span className="material-symbols-outlined">explore</span>
            <span>Browse</span>
          </NavLink>
        </nav>
      </div>

      {/* Library Section */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span>Library</span>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', opacity: 0.5, cursor: 'pointer' }}>more_horiz</span>
            <span className="material-symbols-outlined" style={{ fontSize: '16px', opacity: 0.5, cursor: 'pointer' }}>expand_less</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/library" className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`} end>
            <span className="material-symbols-outlined">schedule</span>
            <span>Recently Added</span>
          </NavLink>
          
          <NavLink to="/library/artists" className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}>
            <span className="material-symbols-outlined">mic</span>
            <span>Artists</span>
          </NavLink>

          <NavLink to="/library/albums" className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}>
            <span className="material-symbols-outlined">library_music</span>
            <span>Albums</span>
          </NavLink>

          <NavLink to="/library/songs" className={({ isActive }) => `sidebar-nav-link ${isActive ? 'active' : ''}`}>
            <span className="material-symbols-outlined">music_note</span>
            <span>Songs</span>
          </NavLink>
        </nav>
      </div>

      {/* Playlists Section */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span>Playlists</span>
          <button className="sidebar-add-playlist-btn" onClick={() => alert('New playlist feature coming soon!')} title="Add Playlist">+</button>
        </div>
        <div className="sidebar-playlists">
          <NavLink to="/playlist" className={({ isActive }) => `sidebar-playlist-link ${isActive ? 'active' : ''}`}>
            <span className="material-symbols-outlined">queue_music</span>
            <span>Pure Fire!! 1 🔥</span>
          </NavLink>
          
          <a href="#" className="sidebar-playlist-link" onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined">queue_music</span>
            <span>Inspired 🦄</span>
          </a>
          <a href="#" className="sidebar-playlist-link" onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined">queue_music</span>
            <span>Nostalgia</span>
          </a>
          <a href="#" className="sidebar-playlist-link" onClick={(e) => e.preventDefault()}>
            <span className="material-symbols-outlined">queue_music</span>
            <span>Calm</span>
          </a>
        </div>
      </div>

      {/* Now Playing Mini Card */}
      {currentSong && (
        <div className="sidebar-mini-card">
          <div className="sidebar-mini-cover-wrapper" onClick={onCoverClick} title="Click to view fullscreen vinyl player">
            <img 
              src={currentSong.cover_url} 
              alt={currentSong.title} 
              className="sidebar-mini-cover" 
            />
            <div className="sidebar-mini-play-overlay" onClick={(e) => {
              e.stopPropagation();
              onTogglePlay();
            }}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </div>
          </div>
          <div className="sidebar-mini-details">
            <div className="sidebar-mini-info">
              <h4 onClick={onCoverClick} title="Click to view fullscreen vinyl player">{currentSong.title}</h4>
              <p>{currentSong.artist}</p>
            </div>
            <button 
              className={`sidebar-mini-like-btn ${isLiked ? 'liked' : ''}`}
              onClick={() => onToggleLike(currentSong.id)}
            >
              <span className="material-symbols-outlined">favorite</span>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default NavBar;
