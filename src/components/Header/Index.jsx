import React from 'react';
import { FaSpotify, FaHeart, FaPlay, FaRandom } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Header.css'; // Certifique-se de criar e estilizar este arquivo conforme suas necessidades

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <FaSpotify className="spotify-icon" />
        <h1 className="header-title">Måneskin Music</h1>
      </div>
      <div className="header-buttons">
        <Link to="/" className="header-button">
          <button className="play-button">
            <FaPlay />
          </button>
        </Link>
        <Link to="/random" className="header-button">
          <button className="random-button">
            <FaRandom />
          </button>
        </Link>
        <Link to="/playlist" className="header-button">
          <button className="add-to-playlist-button">
            <FaHeart />
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
