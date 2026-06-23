// src/App.tsx
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { VinylRecord } from './components/VinylRecord';
import { Background } from './components/Background';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { Header } from './components/Header';
import { PlayerBar } from './components/PlayerBar';
import { MusicProgressBar } from './components/MusicProgressBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Playlist from './pages/Playlist';
import RecentlyAdded from './pages/Library/RecentlyAdded';
import Artists from './pages/Library/Artists';
import Albums from './pages/Library/Albums';
import Songs from './pages/Library/Songs';
import { mockSongs } from './data/mockData';
import type { Song } from './data/mockData';

function App() {
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [likedSongs, setLikedSongs] = useState<string[]>(['song-1', 'song-3', 'song-6']);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSong = queue[currentIndex] || null;

  // Fetch song metadata from backend, fallback to mockData
  useEffect(() => {
    async function fetchSongs() {
      try {
        const res = await fetch("http://localhost:3000/api/songs");
        const data = await res.json();
        if (data && data.songs && data.songs.length > 0) {
          // Normalize backend response if necessary
          setQueue(data.songs.map((s: any) => ({
            ...s,
            duration: s.duration || "3:00",
            durationSec: s.durationSec || 180,
            album: s.album || "Single",
            addedTime: s.addedTime || "Recently"
          })));
        } else {
          throw new Error("Empty songs list");
        }
      } catch (err) {
        console.warn("Backend API offline, falling back to mockData.ts:", err);
        setQueue(mockSongs);
      }
      setCurrentIndex(0);
    }
    fetchSongs();
  }, []);

  // Sync volume with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Sync audio source change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    audio.src = currentSong.audio_url;
    audio.load();

    if (isPlaying) {
      audio.play().catch(e => console.log("Playback error: ", e));
    }
    setProgress(0);
    setCurrentTime(0);
  }, [currentIndex, currentSong]);

  // Sync play/pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;

    if (isPlaying) {
      audio.play().catch(e => console.log("Playback error: ", e));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
      if (audio.duration) {
        setDuration(audio.duration);
        setProgress(audio.currentTime / audio.duration);
      }
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setDuration(audio.duration);
    }
  };

  const nextSong = () => {
    if (queue.length === 0) return;
    if (isRepeat) {
      const audio = audioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log(e));
        setIsPlaying(true);
      }
      return;
    }

    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      setCurrentIndex(randomIndex);
    } else {
      setCurrentIndex(prev => (prev === queue.length - 1 ? 0 : prev + 1));
    }
  };

  const previousSong = () => {
    if (queue.length === 0) return;
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      setCurrentIndex(randomIndex);
    } else {
      setCurrentIndex(prev => (prev === 0 ? queue.length - 1 : prev - 1));
    }
  };

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = clickX / rect.width;
    audio.currentTime = newProgress * audio.duration;
    setProgress(newProgress);
    setCurrentTime(audio.currentTime);
  };

  const handleSelectSong = (songId: string, customQueue?: Song[]) => {
    const targetQueue = customQueue || queue;
    if (customQueue) {
      setQueue(customQueue);
    }
    const idx = targetQueue.findIndex(s => s.id === songId);
    if (idx !== -1) {
      setCurrentIndex(idx);
      setIsPlaying(true);
    }
  };

  const toggleLike = (songId: string) => {
    setLikedSongs(prev =>
      prev.includes(songId)
        ? prev.filter(id => id !== songId)
        : [...prev, songId]
    );
  };

  const toggleShuffle = () => setIsShuffle(p => !p);
  const toggleRepeat = () => setIsRepeat(p => !p);

  return (
    <BrowserRouter>
      {/* Main Grid App Shell */}
      <div className="app-shell">
        
        {/* Persistent Left Sidebar */}
        <div className="sidebar-container">
          <NavBar 
            currentSong={currentSong}
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            onCoverClick={() => setIsOverlayOpen(true)}
            likedSongs={likedSongs}
            onToggleLike={toggleLike}
          />
        </div>

        {/* Main Content Area */}
        <div className="main-container">
          
          {/* Top Header */}
          <div className="header-container">
            <Header 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

          {/* Routed Pages */}
          <main className="content-area custom-scrollbar">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Home 
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                    onSelectSong={handleSelectSong}
                  />
                } 
              />
              <Route 
                path="/search" 
                element={
                  <Search 
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onSelectSong={handleSelectSong}
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                  />
                } 
              />
              <Route 
                path="/playlist" 
                element={
                  <Playlist 
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                    onSelectSong={handleSelectSong}
                    onTogglePlay={togglePlay}
                  />
                } 
              />
              <Route 
                path="/library" 
                element={
                  <RecentlyAdded 
                    onSelectSong={handleSelectSong}
                    likedSongs={likedSongs}
                  />
                } 
              />
              <Route 
                path="/library/artists" 
                element={
                  <Artists 
                    onSelectSong={handleSelectSong}
                    likedSongs={likedSongs}
                  />
                } 
              />
              <Route 
                path="/library/albums" 
                element={
                  <Albums 
                    onSelectSong={handleSelectSong}
                    likedSongs={likedSongs}
                  />
                } 
              />
              <Route 
                path="/library/songs" 
                element={
                  <Songs 
                    onSelectSong={handleSelectSong}
                    likedSongs={likedSongs}
                    onToggleLike={toggleLike}
                  />
                } 
              />
            </Routes>
          </main>
        </div>

        {/* Persistent Bottom Player Bar */}
        <div className="player-container">
          <PlayerBar 
            currentSong={currentSong}
            isPlaying={isPlaying}
            progress={progress}
            currentTime={currentTime}
            duration={duration}
            onTogglePlay={togglePlay}
            onPrev={previousSong}
            onNext={nextSong}
            onSeek={handleSeek}
            onCoverClick={() => setIsOverlayOpen(true)}
            volume={volume}
            onVolumeChange={setVolume}
            likedSongs={likedSongs}
            onToggleLike={toggleLike}
            isShuffle={isShuffle}
            onToggleShuffle={toggleShuffle}
            isRepeat={isRepeat}
            onToggleRepeat={toggleRepeat}
          />
        </div>
      </div>

      {/* Hidden Audio Engine Element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextSong}
      />

      {/* Fullscreen Now Playing Overlay */}
      {currentSong && (
        <div className={`nowplaying-overlay ${isOverlayOpen ? 'visible' : ''}`}>
          <button 
            className="overlay-close-btn" 
            onClick={() => setIsOverlayOpen(false)}
            title="Collapse Player"
          >
            <span className="material-symbols-outlined">expand_more</span>
          </button>
          
          <div className="overlay-content">
            <div className="background-blur">
              <Background coverUrl={currentSong.cover_url} />
            </div>
            
            <VinylRecord isPlaying={isPlaying} coverUrl={currentSong.cover_url} />
            
            <div className="overlay-meta">
              <h1 className="overlay-title">{currentSong.title}</h1>
              <p className="overlay-artist">{currentSong.artist}</p>
            </div>
            
            <div className="overlay-controls">
              <button 
                onClick={toggleShuffle}
                className={isShuffle ? 'active-glow text-primary' : ''}
                title="Shuffle"
                style={{ color: isShuffle ? 'var(--primary)' : '#fff' }}
              >
                <span className="material-symbols-outlined">shuffle</span>
              </button>
              <button onClick={previousSong} title="Previous">
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>skip_previous</span>
              </button>
              <button className="play-pause-btn" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
                <span className="material-symbols-outlined" style={{ fontSize: '36px' }}>
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <button onClick={nextSong} title="Next">
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>skip_next</span>
              </button>
              <button 
                onClick={toggleRepeat}
                title="Repeat"
                style={{ color: isRepeat ? 'var(--primary)' : '#fff' }}
              >
                <span className="material-symbols-outlined">repeat</span>
              </button>
            </div>
            
            <div className="overlay-progress-container">
              <MusicProgressBar 
                progress={progress} 
                currentTime={currentTime} 
                duration={duration} 
                onSeek={handleSeek} 
              />
            </div>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
