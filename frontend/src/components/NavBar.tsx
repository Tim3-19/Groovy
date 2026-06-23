import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar: React.FC = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav-link active' : 'nav-link';

  return (
    <nav className="nav-bar">
      <NavLink to="/" className={linkClass}>Home</NavLink>
      <NavLink to="/search" className={linkClass}>Search</NavLink>
      <NavLink to="/playlist" className={linkClass}>Playlist</NavLink>
      <NavLink to="/accounts" className={linkClass}>Accounts</NavLink>
    </nav>
  );
};

export default NavBar;
