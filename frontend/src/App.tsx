// src/App.tsx
import { useState, useEffect, useRef } from 'react';
import './App.css';
import { VinylRecord } from './components/VinylRecord';
import { Background } from './components/Background';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import{ MusicProgressBar } from './components/MusicProgressBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Playlist from './pages/Playlist';
//import Accounts from './pages/Accounts';

interface Song {
  id: string;
  title: string;
  artist: string;
  cover_url: string;
  audio_url: string;
}

function App() {
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const currentSong = queue[currentIndex] || null;

  // Fetch song meta from backend (replace URL with actual endpoint)
  useEffect(() => {
    async function fetchSongs() {
      try {
        const res = await fetch("http://localhost:3000/api/songs");
        const data = await res.json();

        setQueue(data.songs);
        setCurrentIndex(0);
      } catch (err) {
        console.error(err);
      }
    }

    fetchSongs();
  }, []);

  const nextSong = () => {
    if (queue.length === 0) return;

    setCurrentIndex(prev =>
      prev === queue.length - 1
        ? 0
        : prev + 1
    );
  };

  const previousSong = () => {
    {
      if (queue.length === 0)
        return;

      setCurrentIndex(prev =>
        prev === 0
          ? queue.length - 1
          : prev - 1
      );
    }
  }


  // Sync audio playback with state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);
  //Auto Loading
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio || !currentSong) return;

    audio.src = currentSong.audio_url;

    if (isPlaying) {
      audio.play();
    }

    setProgress(0);
  }, [currentIndex, currentSong]);


  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Update progress bar
  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      setProgress(audio.currentTime / audio.duration);
    }
  };

  const togglePlay = () => {
    setIsPlaying((p) => !p);
  };

  if (!currentSong) {
    return <div className="loader">Loading…</div>;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
            <div className="player-content">
              <div className="background-blur" >
              <Background coverUrl={currentSong.cover_url} />
              </div>
              <VinylRecord isPlaying={isPlaying} coverUrl={currentSong.cover_url} />
              <div className="landing">
                <h1 className="title">{currentSong.title}</h1>
                <h2 className="artist">{currentSong.artist}</h2>
                <div className="controls">
                  <button onClick={previousSong}>⏮ Prev</button>
                  <button onClick={togglePlay}>{isPlaying ? "⏸ Pause" : "▶ Play"}</button>
                  <button onClick={nextSong}>⏭ Next</button>
                </div>
                <audio
                  ref={audioRef}
                  src={currentSong.audio_url}
                  onTimeUpdate={handleTimeUpdate}
                  onEnded={nextSong}
                />
              </div>
                <MusicProgressBar 
  progress={progress} 
  currentTime={audioRef.current?.currentTime || 0} 
  duration={audioRef.current?.duration || 0} 
  onSeek={(e) => {
    // Your existing rock-solid math goes here!
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = clickX / rect.width;
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = newProgress * audioRef.current.duration;
    }
    setProgress(newProgress);
  }} 
/>

              </div>
            </>
          }
        />
        <Route path="/search" element={<Search />} />
        <Route path="/playlist" element={<Playlist />} />
        {/* <Route path="/accounts" element={<Accounts />} /> */}
      </Routes>
 
    </BrowserRouter>
  );
}

export default App;
