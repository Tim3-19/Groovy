import React, { useEffect, useState } from 'react';
import './Background.css';

interface BackgroundProps {
  coverUrl: string;
}

export const Background: React.FC<BackgroundProps> = ({ coverUrl }) => {
  const [bg, setBg] = useState(coverUrl);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // trigger slide animation on cover change
    setAnimate(true);
    const timer = setTimeout(() => {
      setBg(coverUrl);
      setAnimate(false);
    }, 600); // match CSS transition duration
    return () => clearTimeout(timer);
  }, [coverUrl]);

  return (
    <div
      className={`background ${animate ? 'slide' : ''}`}
      style={{ backgroundImage: `url(${bg})` }}
    ></div>
  );
};
