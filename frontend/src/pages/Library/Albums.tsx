import React, { useState } from 'react';
import './Albums.css';
import { mockSongs, mockPlaylists } from '../../data/mockData';
import type { Song } from '../../data/mockData';
import { useNavigate, useLocation } from 'react-router-dom';

interface AlbumsProps {
  onSelectSong: (songId: string, customQueue?: Song[]) => void;
  likedSongs: string[];
}

interface AlbumItem {
  title: string;
  artist: string;
  coverUrl: string;
  songIds: string[];
}

const Albums: React.FC<AlbumsProps> = ({ onSelectSong, likedSongs }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumItem | null>(null);

  // Helper to determine if a song is in the library (liked or in any playlist)
  const playlistSongIds = new Set<string>();
  mockPlaylists.forEach(p => p.songIds.forEach(id => playlistSongIds.add(id)));
  const isSongInLibrary = (song: Song) => {
    return likedSongs.includes(song.id) || playlistSongIds.has(song.id);
  };

  // Group songs by album dynamically (only if song is in library)
  const albumsMap = new Map<string, AlbumItem>();
  mockSongs.forEach(song => {
    if (!isSongInLibrary(song)) return;
    const albumKey = `${song.album.toLowerCase()}_${song.artist.toLowerCase()}`;
    if (!albumsMap.has(albumKey)) {
      albumsMap.set(albumKey, {
        title: song.album,
        artist: song.artist,
        coverUrl: song.cover_url,
        songIds: [song.id]
      });
    } else {
      const current = albumsMap.get(albumKey)!;
      if (!current.songIds.includes(song.id)) {
        current.songIds.push(song.id);
      }
    }
  });
  const allAlbums = Array.from(albumsMap.values());

  const filteredAlbums = allAlbums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAlbumPlay = (e: React.MouseEvent, album: AlbumItem) => {
    e.stopPropagation();
    const albumSongs = mockSongs.filter(s => album.songIds.includes(s.id));
    if (albumSongs.length > 0) {
      onSelectSong(albumSongs[0].id, albumSongs);
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

  const albumSongs = selectedAlbum
    ? mockSongs.filter(s => selectedAlbum.songIds.includes(s.id))
    : [];

  return (
    <div className="page-container library-container">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[90px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      {/* Tab Navigation */}
      {renderTabs()}

      {!selectedAlbum ? (
        <div className="albums-view-content">
          <div className="library-view-header">
            <h2 className="library-view-title">Albums</h2>
            <div className="library-search-wrapper">
              <span className="material-symbols-outlined search-icon">search</span>
              <input
                type="text"
                placeholder="Search albums..."
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

          {filteredAlbums.length === 0 ? (
            <div className="library-empty-state">
              <span className="material-symbols-outlined empty-icon">library_music</span>
              <p>No albums match your search.</p>
            </div>
          ) : (
            <div className="albums-grid-container">
              {filteredAlbums.map((album, idx) => (
                <div 
                  key={`${album.title}_${idx}`} 
                  className="album-large-card glass-card"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <div className="album-large-cover">
                    <img src={album.coverUrl} alt={album.title} />
                    <button 
                      className="album-play-btn-overlay"
                      onClick={(e) => handleAlbumPlay(e, album)}
                      title={`Play ${album.title}`}
                    >
                      <span className="material-symbols-outlined">play_arrow</span>
                    </button>
                  </div>
                  <div className="album-large-info">
                    <h3>{album.title}</h3>
                    <p>{album.artist}</p>
                    <p className="album-song-count">{album.songIds.length} {album.songIds.length === 1 ? 'track' : 'tracks'}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="album-detail-view">
          <button className="library-back-btn" onClick={() => setSelectedAlbum(null)}>
            <span className="material-symbols-outlined">arrow_back</span>
            <span>Back to Albums</span>
          </button>

          <div className="album-detail-header">
            <div className="album-detail-cover">
              <img src={selectedAlbum.coverUrl} alt={selectedAlbum.title} />
            </div>
            <div className="album-detail-meta">
              <span className="album-detail-badge">Album</span>
              <h1 className="album-detail-name">{selectedAlbum.title}</h1>
              <p className="album-detail-stats">By <strong>{selectedAlbum.artist}</strong> • {albumSongs.length} {albumSongs.length === 1 ? 'song' : 'songs'}</p>
              
              {albumSongs.length > 0 && (
                <div className="album-detail-actions">
                  <button 
                    className="playlist-play-btn album-detail-play-btn"
                    onClick={() => onSelectSong(albumSongs[0].id, albumSongs)}
                  >
                    <span className="material-symbols-outlined">play_arrow</span>
                    <span>Play</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="album-tracks-section">
            <h3 className="section-subtitle">Tracks</h3>
            {albumSongs.length === 0 ? (
              <p className="no-tracks-text">No tracks available in this album.</p>
            ) : (
              <div className="artist-tracks-table">
                <div className="table-header-row">
                  <div className="col-index">#</div>
                  <div className="col-title">Title</div>
                  <div className="col-duration">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                </div>
                
                <div className="table-body">
                  {albumSongs.map((song, idx) => (
                    <div 
                      key={song.id} 
                      className="track-row-item"
                      onClick={() => onSelectSong(song.id, albumSongs)}
                    >
                      <div className="col-index">
                        <span className="index-number">{idx + 1}</span>
                        <span className="row-play-icon material-symbols-outlined">play_arrow</span>
                      </div>
                      <div className="col-title">
                        <div className="track-title-info">
                          <span className="track-title-name">{song.title}</span>
                          <span className="track-artist-name">{song.artist}</span>
                        </div>
                      </div>
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

export default Albums;
