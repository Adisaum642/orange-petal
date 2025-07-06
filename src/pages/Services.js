import React from 'react';
import './Services.css'; // Add a separate CSS file for Services page styling
import wedding from '../assets/weeding.jpeg'
import Destination from '../assets/Destination.jpeg'
import Party from '../assets/party.jpeg'
import Concert from '../assets/concet.jpeg'
const Services = () => {
  return (
    <div className="services">
      <h1>Our Services</h1>
      <div className="service-list">
        <div className="service-item">
          <img
            src={wedding} // Replace with a wedding image
            alt="Weddings"
            className="service-image"
          />
          <h2>Weddings</h2>
          <p>We create magical weddings tailored to your vision.</p>
        </div>
        <div className="service-item">
          <img
            src={Destination}// Replace with a destination wedding image
            alt="Destination Weddings"
            className="service-image"
          />
          <h2>Destination Weddings</h2>
          <p>Plan your dream wedding in exotic locations.</p>
        </div>
        <div className="service-item">
          <img
            src={Party} // Replace with a party image
            alt="Parties"
            className="service-image"
          />
          <h2>Parties</h2>
          <p>From birthdays to anniversaries, we make every party special.</p>
        </div>
        <div className="service-item">
          <img
            src={Concert} // Replace with a concert image
            alt="Concerts"
            className="service-image"
          />
          <h2>Concerts</h2>
          <p>Organize unforgettable concerts and live events.</p>
        </div>
      </div>
    </div>
  );
};

export default Services;