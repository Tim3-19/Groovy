import React from 'react';
import './Playlist.css';
import { mockPlaylists, mockSongs } from '../data/mockData';
import type { Song } from '../data/mockData';

interface PlaylistProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onSelectSong: (songId: string, customQueue?: Song[]) => void;
  onTogglePlay: () => void;
}

const Playlist: React.FC<PlaylistProps> = ({
  currentSong,
  isPlaying,
  onSelectSong,
  onTogglePlay
}) => {
  // Focus on the core playlist: "Pure Fire!! 1"
  const playlist = mockPlaylists[0];

  // Resolve songs inside this playlist
  const playlistSongs = mockSongs.filter(song => playlist.songIds.includes(song.id));

  // Determine if active song is in this playlist
  const isCurrentPlaylistPlaying = currentSong 
    ? playlist.songIds.includes(currentSong.id) 
    : false;

  const handlePlayClick = () => {
    if (isCurrentPlaylistPlaying) {
      onTogglePlay();
    } else {
      if (playlistSongs.length > 0) {
        onSelectSong(playlistSongs[0].id, playlistSongs);
      }
    }
  };

  return (
    <div className="page-container playlist-container">
      {/* Volcanic Ambient Glow */}
      <div className="gradient-blur"></div>

      {/* Hero Section */}
      <section className="playlist-hero">
        <div className="playlist-hero-cover-wrapper">
          <img src={playlist.cover_url} alt={playlist.title} />
        </div>
        <div className="playlist-hero-details">
          <span className="playlist-tag">Playlist</span>
          <h1 className="playlist-title">{playlist.title}</h1>
          <div className="playlist-meta">
            <span className="playlist-meta-owner">Created by {playlist.creator}</span>
            <span className="playlist-meta-dot"></span>
            <span>{playlistSongs.length} Songs, {playlist.description ? '8 hrs 42 mins' : '27 mins'}</span>
          </div>
          
          <div className="playlist-actions">
            <button className="playlist-play-btn" onClick={handlePlayClick} title="Play Playlist">
              <span className="material-symbols-outlined">
                {isCurrentPlaylistPlaying && isPlaying ? 'pause' : 'play_arrow'}
              </span>
              <span>{isCurrentPlaylistPlaying && isPlaying ? 'Pause' : 'Play'}</span>
            </button>
            <button className="playlist-secondary-btn" onClick={() => alert('Following features coming soon!')}>
              Follow
            </button>
            <button className="playlist-more-btn" title="More Options">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
        </div>
      </section>

      {/* Tracklist table layout */}
      <section className="playlist-tracklist">
        <div className="playlist-table">
          {/* Header */}
          <div className="playlist-row playlist-table-header">
            <div className="playlist-col-num">#</div>
            <div className="playlist-col-text">Title</div>
            <div className="playlist-col-text">Artist</div>
            <div className="playlist-col-text">Album</div>
            <div className="playlist-col-text">Added</div>
            <div className="playlist-col-text duration-header">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>schedule</span>
            </div>
          </div>
          
          {/* Track rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {playlistSongs.map((song, index) => {
              const isActive = currentSong?.id === song.id;
              return (
                <div 
                  key={song.id} 
                  className={`playlist-row ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectSong(song.id, playlistSongs)}
                >
                  <div className="playlist-col-num">
                    <span>{index + 1}</span>
                    <span className="row-play-btn material-symbols-outlined">
                      {isActive && isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </div>
                  
                  <div className="playlist-col-title">
                    <div className="playlist-col-title-cover">
                      <img src={song.cover_url} alt={song.title} />
                    </div>
                    <div className="playlist-col-title-details">
                      <h4>{song.title}</h4>
                    </div>
                  </div>
                  
                  <div className="playlist-col-text">{song.artist}</div>
                  
                  <div className="playlist-col-text">{song.album}</div>
                  
                  <div className="playlist-col-text">{song.addedTime}</div>
                  
                  <div className="playlist-col-duration">{song.duration}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Playlist;
