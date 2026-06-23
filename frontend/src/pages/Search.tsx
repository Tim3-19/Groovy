import React, { useState, useEffect } from 'react';
import './Search.css';
import { mockSongs, mockCategories } from '../data/mockData';
import type { Song } from '../data/mockData';

interface SearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectSong: (songId: string, customQueue?: Song[]) => void;
  currentSong: Song | null;
  isPlaying: boolean;
}

interface RecentSearchItem {
  id: string;
  name: string;
  type: 'Artist' | 'Album' | 'Song';
  image_url: string;
  songId?: string;
}

const Search: React.FC<SearchProps> = ({
  searchQuery,
  onSearchChange,
  onSelectSong,
  currentSong,
  isPlaying
}) => {
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);

  // Seed recent searches if empty
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    } else {
      const defaultRecents: RecentSearchItem[] = [
        {
          id: "recent-1",
          name: "Frank Ocean",
          type: "Artist",
          image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2D2bi2DUaU5z_50F-RneIBm-FMHc0dWnBtaSSpb0OUecnskU5SUtF3My11gb85XM8K_SRs3rTasDLfU6oj9rHbbYHmwkoVuHINBNuW4LHwPSEOG5KEOaTvortZJbpSJeHK-pOKBLUlC26d24qxibI_nq0IwOFvDPNO8WIhoIqwAACWsxAiteIFAd4uIZFYfQqRPVY0V20CaFObvE0A2VfmWd_VrM-44axNaT3Anz_bZ01cDDgWPkTcZMC2G467_eljpoHT9eDwrZx"
        },
        {
          id: "recent-2",
          name: "Endless",
          type: "Album",
          image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3l16NOAP-MUqIR1aIu6FxfmAFluXPfjcZtNpSK_vPwLCDxOfVLcwIEiZBPylmbl02zLxf78C08zW-TwOjb61z8_WkaNVse0un4JI2sjEhOP0gOXpIYokRWKcSgzsrp3KP3DuU4z4M2SqXnZbBAWNmRg8uEgoV0EmfJXZqLhGdtvv0kYHrfe-RHx_srCjf4RVIhfcNEx66ZiVxpctXuI5fhmWMUmzQvN604L9xgfsEzLZMizdTgHhiPvUa1zI5GsNdt9zRpGOQAuoo"
        }
      ];
      setRecentSearches(defaultRecents);
      localStorage.setItem("recentSearches", JSON.stringify(defaultRecents));
    }
  }, []);

  // Filter songs based on search query
  const filteredSongs = mockSongs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectSongResult = (song: Song) => {
    // Play song
    onSelectSong(song.id, mockSongs);

    // Save to recents
    const isAlreadyInRecents = recentSearches.some(item => item.songId === song.id);
    if (!isAlreadyInRecents) {
      const newItem: RecentSearchItem = {
        id: `recent-${Date.now()}`,
        name: song.title,
        type: "Song",
        image_url: song.cover_url,
        songId: song.id
      };
      const updated = [newItem, ...recentSearches.filter(item => item.name !== song.title)].slice(0, 6);
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }
  };

  const handleSelectRecent = (item: RecentSearchItem) => {
    if (item.songId) {
      onSelectSong(item.songId, mockSongs);
    } else {
      // Set search query to its name to search it
      onSearchChange(item.name);
    }
  };

  const handleCategoryClick = (categoryTitle: string) => {
    onSearchChange(categoryTitle);
  };

  const handleClearAllRecents = () => {
    setRecentSearches([]);
    localStorage.setItem("recentSearches", JSON.stringify([]));
  };

  return (
    <div className="page-container search-container">
      {/* Dynamic Results vs Dashboard */}
      {searchQuery.trim() !== "" ? (
        <section className="search-section">
          <div className="search-section-header">
            <h2 className="search-section-title">Search Results for "{searchQuery}"</h2>
            <button className="clear-search-btn" onClick={() => onSearchChange("")}>
              Clear
            </button>
          </div>
          
          {filteredSongs.length > 0 ? (
            <div className="search-results-list">
              {filteredSongs.map((song) => {
                const isActive = currentSong?.id === song.id;
                return (
                  <div 
                    key={song.id} 
                    className={`search-result-row ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectSongResult(song)}
                    title={`Play ${song.title}`}
                  >
                    <div className="search-result-cover">
                      <img src={song.cover_url} alt={song.title} />
                    </div>
                    <div className="search-result-info">
                      <h4 className="search-result-title">{song.title}</h4>
                      <p className="search-result-meta">{song.artist} • {song.album}</p>
                    </div>
                    <div className="search-result-duration">{song.duration}</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-results-msg">
              <span className="material-symbols-outlined" style={{ fontSize: '48px', opacity: 0.5, marginBottom: '12px', display: 'block' }}>
                sentiment_dissatisfied
              </span>
              No results found. Try searching for "Frank Ocean", "Grimes", or "Kanye".
            </div>
          )}
        </section>
      ) : (
        <>
          {/* 1. Recent Searches */}
          {recentSearches.length > 0 && (
            <section className="search-section">
              <div className="search-section-header">
                <h2 className="search-section-title">Recent searches</h2>
                <button className="clear-search-btn" onClick={handleClearAllRecents}>
                  Clear all
                </button>
              </div>
              <div className="recent-searches-grid">
                {recentSearches.map((item) => (
                  <div 
                    key={item.id} 
                    className="recent-search-card"
                    onClick={() => handleSelectRecent(item)}
                    title={`Search/Play ${item.name}`}
                  >
                    <div className="recent-search-avatar">
                      <img src={item.image_url} alt={item.name} />
                      <div className="play-hover">
                        <span className="material-symbols-outlined">
                          {item.songId && currentSong?.id === item.songId && isPlaying ? 'pause_circle' : 'play_circle'}
                        </span>
                      </div>
                    </div>
                    <div className="recent-search-card-meta">
                      <p className="recent-search-name">{item.name}</p>
                      <p className="recent-search-type">{item.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 2. Browse All Categories */}
          <section className="search-section">
            <h2 className="search-section-title" style={{ marginBottom: '24px' }}>Browse all</h2>
            <div className="browse-categories-grid">
              {mockCategories.map((cat) => (
                <div 
                  key={cat.id} 
                  className="category-card"
                  style={{ '--cat-color': cat.bgColor } as React.CSSProperties}
                  onClick={() => handleCategoryClick(cat.title)}
                  title={`Browse ${cat.title}`}
                >
                  <img src={cat.image_url} alt={cat.title} className="category-bg-img" />
                  <div className="category-gradient-overlay" />
                  <h3 className="category-title">{cat.title}</h3>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Search;