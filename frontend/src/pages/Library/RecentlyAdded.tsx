import React from 'react';
import './RecentlyAdded.css';
import { mockSongs, mockPlaylists, mockArtists, mockActivities } from '../../data/mockData';
import type { Song } from '../../data/mockData';
import { useNavigate, useLocation } from 'react-router-dom';

interface RecentlyAddedProps {
  onSelectSong: (songId: string, customQueue?: Song[]) => void;
  likedSongs: string[];
}

const RecentlyAdded: React.FC<RecentlyAddedProps> = ({ onSelectSong, likedSongs }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper to determine if a song is in the library (liked or in any playlist)
  const playlistSongIds = new Set<string>();
  mockPlaylists.forEach(p => p.songIds.forEach(id => playlistSongIds.add(id)));
  const isSongInLibrary = (song: Song) => {
    return likedSongs.includes(song.id) || playlistSongIds.has(song.id);
  };

  // Filter artists: only show those who have at least one song in the library
  const libraryArtists = mockArtists.filter(artist => {
    const artistSongs = mockSongs.filter(s => s.artist.toLowerCase().includes(artist.name.toLowerCase()));
    return artistSongs.some(isSongInLibrary);
  });

  const handlePlaylistClick = (_playlistId: string) => {
    navigate('/playlist');
  };

  const handlePlaylistPlay = (e: React.MouseEvent, playlistId: string) => {
    e.stopPropagation();
    const playlist = mockPlaylists.find(p => p.id === playlistId);
    if (playlist && playlist.songIds.length > 0) {
      const playlistSongs = mockSongs.filter(s => playlist.songIds.includes(s.id));
      if (playlistSongs.length > 0) {
        onSelectSong(playlistSongs[0].id, playlistSongs);
      }
    }
  };

  const handleArtistClick = (artistName: string) => {
    const artistSongs = mockSongs.filter(s => s.artist.toLowerCase().includes(artistName.toLowerCase()));
    if (artistSongs.length > 0) {
      onSelectSong(artistSongs[0].id, mockSongs);
    }
  };

  const handleActivityClick = (activity: any) => {
    if (activity.title.includes("Liked")) {
      onSelectSong("song-1", mockSongs);
    } else if (activity.title.includes("Created")) {
      const playlistSongs = mockSongs.filter(s => mockPlaylists[0].songIds.includes(s.id));
      if (playlistSongs.length > 0) {
        onSelectSong(playlistSongs[0].id, playlistSongs);
      }
    }
  };

  const renderTabs = () => {
    const currentPath = location.pathname;
    return (
      <div className="library-tabs-nav">
        <button 
          className={`library-tab-btn ${currentPath === '/library' ? 'active' : ''}`}
          onClick={() => navigate('/library')}
        >
          Recently Added
        </button>
        <button 
          className={`library-tab-btn ${currentPath === '/library/artists' ? 'active' : ''}`}
          onClick={() => navigate('/library/artists')}
        >
          Artists
        </button>
        <button 
          className={`library-tab-btn ${currentPath === '/library/albums' ? 'active' : ''}`}
          onClick={() => navigate('/library/albums')}
        >
          Albums
        </button>
        <button 
          className={`library-tab-btn ${currentPath === '/library/songs' ? 'active' : ''}`}
          onClick={() => navigate('/library/songs')}
        >
          Songs
        </button>
      </div>
    );
  };

  return (
    <div className="page-container library-container">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[90px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      {/* Tab Navigation */}
      {renderTabs()}

      {/* User Dashboard Profile Hero */}
      <section className="library-hero">
        <div className="library-avatar-wrapper">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNX9w9XRuuLg9qMpY4cix29q333dAJM2wkT8slVu3nNMBsDOuUhM12fhSEivEtunle4GqX8iW3vNruXYBdfVmq2l8igfycQpSZb5VNS03zk3ul3JpedrGe368SSoZtk79a9vJPB0WxLD4zhes1pVYEdU5AbNo2f3k-u4CpHKA2-3Gr11LbXJzUpX_Na7KSj33s5j3BnwKsdklJUpVlO1Jf6i25FxvIPlzVQHP0qorwA4XN_7U4AQrPhnSBC_odcmBPYDWK4JhaaNkf" 
            alt="Wolfgang Mozart" 
          />
          <button className="library-edit-avatar-btn" onClick={() => alert('Change profile photo feature coming soon!')}>
            <span className="material-symbols-outlined">edit</span>
          </button>
        </div>
        
        <div className="library-profile-info">
          <div className="library-badge">
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>verified</span>
            Verified Premium Member
          </div>
          <h2 className="library-name">Wolfgang Mozart</h2>
          <div className="library-stats">
            <span><strong>{likedSongs.length}</strong> Liked Tracks</span>
            <span><strong>{mockPlaylists.length + 136}</strong> Playlists</span>
            <span><strong>8.4k</strong> Followers</span>
            <span><strong>240</strong> Following</span>
          </div>
          
          <div className="library-hero-actions">
            <button className="playlist-secondary-btn" style={{ padding: '8px 24px' }} onClick={() => alert('Profile link copied!')}>
              Share
            </button>
            <button className="playlist-play-btn" style={{ padding: '8px 24px' }} onClick={() => alert('You are following yourself!')}>
              Follow
            </button>
          </div>
        </div>
      </section>

      {/* Bento Layout Widgets */}
      <div className="bento-grid">
        
        {/* Widget 1: Top Artists (Col span 8) */}
        <div className="bento-col-artists glass-card p-6 rounded-2xl">
          <div className="flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 className="search-section-title">Top Artists this Month</h3>
            <button className="clear-search-btn" onClick={() => navigate('/library/artists')}>View all</button>
          </div>
          
          <div className="artists-list-grid">
            {libraryArtists.map((artist) => (
              <div 
                key={artist.id} 
                className="artist-circle-card"
                onClick={() => handleArtistClick(artist.name)}
                title={`Play tracks by ${artist.name}`}
              >
                <div className="artist-circle-avatar">
                  <img src={artist.image_url} alt={artist.name} />
                  <div className="play-hover">
                    <span className="material-symbols-outlined">play_circle</span>
                  </div>
                </div>
                <p className="artist-circle-name">{artist.name}</p>
                <p className="artist-circle-type">{artist.type}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Widget 2: Recent Activity (Col span 4) */}
        <div className="bento-col-activity glass-card p-6 rounded-2xl flex flex-col">
          <h3 className="search-section-title">Recent Activity</h3>
          <div className="activity-list">
            {mockActivities.map((act) => (
              <div 
                key={act.id} 
                className="activity-item"
                onClick={() => handleActivityClick(act)}
                title="Interact with activity"
              >
                <div className="activity-cover">
                  {act.cover_url ? (
                    <img src={act.cover_url} alt={act.title} />
                  ) : (
                    <span className="material-symbols-outlined">person_add</span>
                  )}
                </div>
                <div className="activity-details">
                  <p className="activity-text">{act.title}</p>
                  <p className="activity-time">{act.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="activity-see-all-btn" onClick={() => alert('No older history found')}>
            See all history
          </button>
        </div>

        {/* Widget 3: Public Playlists (Col span 12) */}
        <div className="bento-col-playlists glass-card p-6 rounded-2xl">
          <div className="playlists-slider-header">
            <h3 className="search-section-title">Public Playlists</h3>
            <div className="playlists-nav-btns">
              <button className="playlists-nav-btn" onClick={() => alert('Playlists are fully listed below.')} title="Scroll left">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="playlists-nav-btn" onClick={() => alert('Playlists are fully listed below.')} title="Scroll right">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
          
          <div className="playlists-grid">
            {mockPlaylists.map((pl) => (
              <div 
                key={pl.id} 
                className="playlist-grid-card"
                onClick={() => handlePlaylistClick(pl.id)}
                title={`Open ${pl.title}`}
              >
                <div className="playlist-grid-cover-wrapper">
                  <img src={pl.cover_url} alt={pl.title} />
                  <div className="playlist-grid-play-overlay">
                    <div 
                      className="playlist-grid-play-btn-circle"
                      onClick={(e) => handlePlaylistPlay(e, pl.id)}
                      title="Play playlist"
                    >
                      <span className="material-symbols-outlined">play_arrow</span>
                    </div>
                  </div>
                </div>
                <h4>{pl.title}</h4>
                <p>{pl.songCountText || '42 songs • 2.5 hrs'}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default RecentlyAdded;
