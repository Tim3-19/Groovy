import React, { useState, useEffect } from 'react';
import './Search.css';

interface Song {
  id: string;
  title: string;
  artist: string;
  cover_url: string;
  audio_url: string;
}


const Search: React.FC = () => {
  // 1. All hooks and state MUST live inside the component
  
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [query, setQuery] = useState("");
const [results, setResults] = useState<Song[]>([]);
const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {

  if (!query.trim()) {
    setResults([]);
    return;
  }

  const timer = setTimeout(async () => {

    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:3000/api/search?q=${query}`
      );

      const data = await res.json();

      setResults(data.results);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  }, 300);

  return () => clearTimeout(timer);

}, [query]);

  const saveRecentSearch = (search: string) => {
    if (!search.trim()) return;

    const updated = [
      search,
      ...recentSearches.filter(
        item => item.toLowerCase() !== search.toLowerCase()
      )
    ].slice(0, 10);

    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveRecentSearch(query);
    console.log("Search API call:", query);
  };

  return (
    <div className="page search-page">
      {/* 2. Wrap the input in a form so 'Enter' triggers handleSubmit */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search songs, artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </form>
      <div className="search-results">
  {results.map((song) => (
    <div key={song.id} className="song-row">
      <img
        src={song.cover_url}
        alt={song.title}
        className="song-cover"
      />

      <div className="song-info">
        <h4>{song.title}</h4>
        <p>{song.artist}</p>
      </div>
    </div>
  ))}
</div>

      <h3>Recent Searches</h3> 
      <div className="recent-list">
        {recentSearches.map((search, index) => (
          <button 
            key={index} 
            className="recent-item" 
            onClick={() => setQuery(search)} 
          > 
            {search} 
          </button> 
        ))} 
      </div> 
    </div>
  );
};

export default Search;