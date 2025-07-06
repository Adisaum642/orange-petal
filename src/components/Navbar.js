import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import './Navbar.css';
const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} alt="orange petal logo" className="navbar-logo"/>
      <div className="logo">Orange Petal</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;