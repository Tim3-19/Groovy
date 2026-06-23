import React, { useState } from 'react';
import './Artists.css';
import { mockSongs, mockArtists, mockPlaylists } from '../../data/mockData';
import type { Song, Artist } from '../../data/mockData';
import { useNavigate, useLocation } from 'react-router-dom';

interface ArtistsProps {
  onSelectSong: (songId: string, customQueue?: Song[]) => void;
  likedSongs: string[];
}

const Artists: React.FC<ArtistsProps> = ({ onSelectSong, likedSongs }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

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

  const filteredArtists = libraryArtists.filter(artist =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleArtistPlay = (e: React.MouseEvent, artist: Artist) => {
    e.stopPropagation();
    const artistSongs = mockSongs.filter(s =>
      s.artist.toLowerCase().includes(artist.name.toLowerCase()) && isSongInLibrary(s)
    );
    if (artistSongs.length > 0) {
      onSelectSong(artistSongs[0].id, artistSongs);
    } else {
      alert(`No tracks found for ${artist.name} in library`);
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

  // Get selected artist's songs that are in library
  const artistSongs = selectedArtist 
    ? mockSongs.filter(s => s.artist.toLowerCase().includes(selectedArtist.name.toLowerCase()) && isSongInLibrary(s))
    : [];

  return (
    <div className="page-container library-container">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[90px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      {/* Tab Navigation */}
      {renderTabs()}

      {!selectedArtist ? (
        <div className="artists-view-content">
          <div className="library-view-header">
            <h2 className="library-view-title">Artists</h2>
            <div className="library-search-wrapper">
              <span className="material-symbols-outlined search-icon">search</span>
              <input
                type="text"
                placeholder="Search artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="library-search-input"
              />
              {searchQuery && (
                <button className="clear-search-btn-inside" onClick={() => setSearchQuery('')}>
                  <span className="material-symbols-outlined">close</span>
                </button>
              )}
            </div>
          </div>

          {filteredArtists.length === 0 ? (
            <div className="library-empty-state">
              <span className="material-symbols-outlined empty-icon">group</span>
              <p>No artists match your search.</p>
            </div>
          ) : (
            <div className="artists-grid-container">
              {filteredArtists.map((artist) => (
                <div 
                  key={artist.id} 
                  className="artist-large-card glass-card"
                  onClick={() => setSelectedArtist(artist)}
                >
                  <div className="artist-large-avatar">
                    <img src={artist.image_url} alt={artist.name} />
                    <button 
                      className="artist-play-btn-overlay"
                      onClick={(e) => handleArtistPlay(e, artist)}
                      title={`Play ${artist.name}`}
                    >
                      <span className="material-symbols-outlined">play_arrow</span>
                    </button>
                  </div>
                  <div className="artist-large-info">
                    <h3>{artist.name}</h3>
                    <p>{artist.type}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="artist-detail-view">
          <button className="library-back-btn" onClick={() => setSelectedArtist(null)}>
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Back to Artists</span>
          </button>

          <div className="artist-detail-header">
            <div className="artist-detail-avatar">
              <img src={selectedArtist.image_url} alt={selectedArtist.name} />
            </div>
            <div className="artist-detail-meta">
              <span className="artist-detail-badge">{selectedArtist.type}</span>
              <h1 className="artist-detail-name">{selectedArtist.name}</h1>
              <p className="artist-detail-stats">{artistSongs.length} songs in your library</p>
              
              {artistSongs.length > 0 && (
                <button 
                  className="playlist-play-btn artist-detail-play-btn"
                  onClick={() => onSelectSong(artistSongs[0].id, artistSongs)}
                >
                  <span className="material-symbols-outlined">play_arrow</span>
                  <span>Play All</span>
                </button>
              )}
            </div>
          </div>

          <div className="artist-tracks-section">
            <h3 className="section-subtitle">Tracks</h3>
            {artistSongs.length === 0 ? (
              <p className="no-tracks-text">No tracks available for this artist in library.</p>
            ) : (
              <div className="artist-tracks-table">
                <div className="table-header-row">
                  <div className="col-index">#</div>
                  <div className="col-title">Title</div>
                  <div className="col-album">Album</div>
                  <div className="col-duration">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                </div>
                
                <div className="table-body">
                  {artistSongs.map((song, idx) => (
                    <div 
                      key={song.id} 
                      className="track-row-item"
                      onClick={() => onSelectSong(song.id, artistSongs)}
                    >
                      <div className="col-index">
                        <span className="index-number">{idx + 1}</span>
                        <span className="row-play-icon material-symbols-outlined">play_arrow</span>
                      </div>
                      <div className="col-title">
                        <img src={song.cover_url} alt={song.title} className="track-row-cover" />
                        <div className="track-title-info">
                          <span className="track-title-name">{song.title}</span>
                          <span className="track-artist-name">{song.artist}</span>
                        </div>
                      </div>
                      <div className="col-album">{song.album}</div>
                      <div className="col-duration">{song.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Artists;
