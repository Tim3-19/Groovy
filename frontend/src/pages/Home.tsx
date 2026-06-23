import React, { useRef } from 'react';
import './Home.css';
import { mockPlaylists, mockSongs } from '../data/mockData';
import type { Song } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onSelectSong: (songId: string, customQueue?: Song[]) => void;
}

const Home: React.FC<HomeProps> = ({
  currentSong,
  isPlaying,
  onSelectSong
}) => {
  const navigate = useNavigate();
  const sliderRef = useRef<HTMLDivElement>(null);

  // Jump back in: First 3 playlists
  const featuredPlaylists = mockPlaylists.slice(0, 3);
  
  // Trending Now: First 5 songs
  const trendingSongs = mockSongs.slice(0, 5);

  // Made for Wolfgang: Songs 6 to 10
  const recommendedSongs = mockSongs.slice(5, 10);

  const scrollSlider = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handlePlaylistClick = (_playlistId: string) => {
    // Navigate to playlist page
    navigate('/playlist');
  };

  const handlePlaylistPlay = (e: React.MouseEvent, playlistId: string) => {
    e.stopPropagation();
    const playlist = mockPlaylists.find(p => p.id === playlistId);
    if (playlist && playlist.songIds.length > 0) {
      // Find songs in mockData
      const playlistSongs = mockSongs.filter(s => playlist.songIds.includes(s.id));
      if (playlistSongs.length > 0) {
        onSelectSong(playlistSongs[0].id, playlistSongs);
      }
    }
  };

  return (
    <div className="page-container home-container">
      {/* Background Glow */}
      <div className="hero-glow"></div>

      {/* 1. Jump Back In */}
      <section className="home-section">
        <h2 className="home-section-title">Jump back in</h2>
        <div className="featured-grid">
          {featuredPlaylists.map((playlist) => (
            <div 
              key={playlist.id} 
              className="featured-card"
              onClick={() => handlePlaylistClick(playlist.id)}
              title="Click to open playlist"
            >
              <div className="featured-card-cover-wrapper">
                <img src={playlist.cover_url} alt={playlist.title} />
                <div 
                  className="featured-card-play-overlay"
                  onClick={(e) => handlePlaylistPlay(e, playlist.id)}
                  title="Play playlist"
                >
                  <span className="material-symbols-outlined">play_circle</span>
                </div>
              </div>
              <div className="featured-card-details">
                <h3>{playlist.title}</h3>
                <p>Playlist • {playlist.creator}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Trending Now (Bento Slider) */}
      <section className="home-section">
        <div className="trending-header">
          <div>
            <h2 className="home-section-title">Trending Now</h2>
            <p className="home-section-subtitle">Hot releases lighting up the charts</p>
          </div>
          <div className="trending-nav-btns">
            <button className="trending-nav-btn" onClick={() => scrollSlider('left')} title="Scroll left">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="trending-nav-btn" onClick={() => scrollSlider('right')} title="Scroll right">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
        
        <div className="trending-slider custom-scrollbar" ref={sliderRef}>
          {trendingSongs.map((song) => (
            <div 
              key={song.id} 
              className="trending-card"
              onClick={() => onSelectSong(song.id, mockSongs)}
              title={`Play ${song.title}`}
            >
              <div className="trending-cover-wrapper">
                <img src={song.cover_url} alt={song.title} />
                <div className="trending-play-overlay">
                  <div className="trending-play-btn-circle">
                    <span className="material-symbols-outlined">
                      {currentSong?.id === song.id && isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </div>
                </div>
              </div>
              <h4>{song.title}</h4>
              <p>{song.artist}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Made For You */}
      <section className="home-section">
        <h2 className="home-section-title">Made for Wolfgang</h2>
        <p className="home-section-subtitle">Fresh tracks custom-picked for your mood</p>
        
        <div className="tracks-table-container">
          <table className="tracks-table">
            <thead>
              <tr>
                <th className="track-col-num">#</th>
                <th>Title</th>
                <th>Album</th>
                <th className="track-col-duration">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>schedule</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {recommendedSongs.map((song, index) => {
                const isActive = currentSong?.id === song.id;
                return (
                  <tr 
                    key={song.id} 
                    className={`track-row ${isActive ? 'active' : ''}`}
                    onClick={() => onSelectSong(song.id, mockSongs)}
                  >
                    <td className="track-col-num">
                      <span>{index + 1}</span>
                      <span className="row-play-icon material-symbols-outlined">
                        {isActive && isPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </td>
                    <td className="track-col-title">
                      <div className="track-table-cover">
                        <img src={song.cover_url} alt={song.title} />
                      </div>
                      <div className="track-title-info">
                        <h4>{song.title}</h4>
                        <p>{song.artist}</p>
                      </div>
                    </td>
                    <td className="track-col-album">{song.album}</td>
                    <td className="track-col-duration">{song.duration}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Home;
