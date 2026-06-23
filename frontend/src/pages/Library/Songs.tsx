import React, { useState } from 'react';
import './Songs.css';
import { mockSongs, mockPlaylists } from '../../data/mockData';
import type { Song } from '../../data/mockData';
import { useNavigate, useLocation } from 'react-router-dom';

interface SongsProps {
  onSelectSong: (songId: string, customQueue?: Song[]) => void;
  likedSongs: string[];
  onToggleLike: (songId: string) => void;
}

type SortKey = 'title' | 'artist' | 'album';

const Songs: React.FC<SongsProps> = ({ onSelectSong, likedSongs, onToggleLike }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('title');

  // Helper to determine if a song is in the library (liked or in any playlist)
  const playlistSongIds = new Set<string>();
  mockPlaylists.forEach(p => p.songIds.forEach(id => playlistSongIds.add(id)));
  const isSongInLibrary = (song: Song) => {
    return likedSongs.includes(song.id) || playlistSongIds.has(song.id);
  };

  const librarySongs = mockSongs.filter(isSongInLibrary);

  const filteredSongs = librarySongs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Apply sorting
  const sortedSongs = [...filteredSongs].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'artist') return a.artist.localeCompare(b.artist);
    if (sortBy === 'album') return a.album.localeCompare(b.album);
    return 0;
  });

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

      <div className="songs-view-content">
        <div className="library-view-header">
          <h2 className="library-view-title">Songs</h2>
          <div className="library-controls-group">
            <div className="library-search-wrapper">
              <span className="material-symbols-outlined search-icon">search</span>
              <input
                type="text"
                placeholder="Search songs..."
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

            <div className="sort-dropdown-wrapper">
              <span className="material-symbols-outlined sort-icon">sort</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="sort-select"
              >
                <option value="title">Sort by Title</option>
                <option value="artist">Sort by Artist</option>
                <option value="album">Sort by Album</option>
              </select>
            </div>
          </div>
        </div>

        {sortedSongs.length > 0 && (
          <div className="songs-view-actions">
            <button 
              className="playlist-play-btn"
              onClick={() => onSelectSong(sortedSongs[0].id, sortedSongs)}
            >
              <span className="material-symbols-outlined">play_arrow</span>
              <span>Play All</span>
            </button>
          </div>
        )}

        {sortedSongs.length === 0 ? (
          <div className="library-empty-state">
            <span className="material-symbols-outlined empty-icon">music_note</span>
            <p>No songs match your search.</p>
          </div>
        ) : (
          <div className="songs-table-container">
            <div className="songs-table">
              <div className="table-header-row">
                <div className="col-index">#</div>
                <div className="col-title">Title</div>
                <div className="col-album">Album</div>
                <div className="col-like"></div>
                <div className="col-duration">
                  <span className="material-symbols-outlined">schedule</span>
                </div>
              </div>

              <div className="table-body">
                {sortedSongs.map((song, idx) => {
                  const isLiked = likedSongs.includes(song.id);
                  return (
                    <div 
                      key={song.id} 
                      className="track-row-item"
                      onClick={() => onSelectSong(song.id, sortedSongs)}
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

                      <div className="col-like" onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(song.id);
                      }}>
                        <button className={`song-row-like-btn ${isLiked ? 'liked' : ''}`}>
                          <span className="material-symbols-outlined">
                            {isLiked ? 'favorite' : 'favorite_border'}
                          </span>
                        </button>
                      </div>

                      <div className="col-duration">{song.duration}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Songs;
