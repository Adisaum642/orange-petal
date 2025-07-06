import React from 'react';
import './Home.css'; // Add a separate CSS file for Home page styling
import heroVideo from '../assets/bg-video.mp4';
import logo from '../assets/logo.png'
import about from '../assets/about.jpeg'

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="hero-video"
        >
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-text">
        <img src={logo} alt="orange petal logo" className="navbar-logo2"/>
          <h1>Welcome to Orange Petal</h1>
          <p>Your dream events, beautifully executed.</p>
          <button className="cta-button">Explore Our Services</button>
        </div>
      </div>

      <div className="about-section">
        <h2>About Us</h2>
        <p>
          At Orange Petal, we specialize in creating unforgettable moments. From intimate
          gatherings to grand celebrations, our team ensures every detail is perfect.
        </p>
        <img
          src={about} // Replace with an about image
          alt="About Us"
          className="about-image"
        />
      </div>
    </div>
  );
};

export default Home;