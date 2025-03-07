import React, { useState } from 'react';
import logo from '../Images/logo.webp';
import '../css/Navbar.css'
import '../css/Home.css'
import { Link } from 'react-router-dom';



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);


  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');                 
  };

  return (
    <header className={`navbar ${darkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <div>

        <div className="logo">
          <img src={logo} alt="logo"className='logo-bth' />
          <p>MEMEDOG</p>
        </div>
        </div>

        <div className='container-2'>
        <div>
        <button onClick={toggleDarkMode} className="dark-mode-btn">
          {darkMode ? '🌙' : '☀️'}
        </button>
        </div>
            <div>

        <nav className="nav-links">
        <Link to='/Profile'>
          Profile
          </Link>
          <Link to='/Upload'>
          <a href="#">Upload</a>
          </Link>
          
          <Link to='/Explore'>
          <a href="#">Explore</a>
          </Link>
          
        </nav>
        </div>

        <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        </div>
      </div>


      {isMenuOpen && (
        <nav className="mobile-menu">
          <ul>
          <li><Link to='/Profile'>
          Profile
          </Link></li>
          <li><Link to='/Upload'>
          <a href="#">Upload</a>
          </Link></li>
            <li><Link to='/Explore'>
          <a href="#">Explore</a>
          </Link></li>
            
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
