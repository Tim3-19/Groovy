import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
    if (location.pathname !== '/search') {
      navigate('/search');
    }
  };

  const handleAvatarClick = () => {
    navigate('/library');
  };

  return (
    <header className="top-header">
      {/* Search Input Bar */}
      <div className="header-search-bar">
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          className="header-search-input"
          placeholder="Search for artists, songs, or podcasts"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>

      {/* Header Actions */}
      <div className="header-actions">
        <button 
          className="header-icon-btn" 
          onClick={() => alert('No new notifications')}
          title="Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button 
          className="header-icon-btn" 
          onClick={() => navigate('/library')}
          title="Settings"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
        
        <button 
          className="upgrade-btn" 
          onClick={() => alert('Upgrading accounts is not available in mock mode.')}
        >
          Upgrade
        </button>

        {/* User Profile Avatar */}
        <div className="header-avatar" onClick={handleAvatarClick} title="View Profile">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNX9w9XRuuLg9qMpY4cix29q333dAJM2wkT8slVu3nNMBsDOuUhM12fhSEivEtunle4GqX8iW3vNruXYBdfVmq2l8igfycQpSZb5VNS03zk3ul3JpedrGe368SSoZtk79a9vJPB0WxLD4zhes1pVYEdU5AbNo2f3k-u4CpHKA2-3Gr11LbXJzUpX_Na7KSj33s5j3BnwKsdklJUpVlO1Jf6i25FxvIPlzVQHP0qorwA4XN_7U4AQrPhnSBC_odcmBPYDWK4JhaaNkf" 
            alt="Wolfgang Mozart" 
          />
        </div>
      </div>
    </header>
  );
};
