import React from "react";
import "./GarbaBanner.css";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const GarbaBanner = () => {
  return (
    <section className="garba-banner">
      {/* Decorative Background Elements */}
      <div className="garba-glow garba-glow-one"></div>
      <div className="garba-glow garba-glow-two"></div>
      <div className="garba-circle circle-one"></div>
      <div className="garba-circle circle-two"></div>

      <div className="garba-content">

        {/* Brand / Label */}
        <div className="garba-label">
          ✦ ORANGE PETAL PRESENTS ✦
        </div>

        {/* Main Heading */}
        <h1 className="garba-title">
          Dandiya
          <span>Night 2026</span>
        </h1>

        {/* Divider */}
        <div className="garba-divider">
          <span></span>
          <b>✦</b>
          <span></span>
        </div>

        {/* Description */}
        <p className="garba-description">
          Get ready for an unforgettable night of music, dance,
          colours and festive energy. Grab your Dandiya sticks with complementary snacks,
          and join the celebration!
        </p>

        {/* Event Information */}
        <div className="event-info">

          <div className="event-info-item">
            <div className="info-icon">
              📅
            </div>

            <div className="info-content">
              <small>DATE</small>
              <strong>18 OCTOBER 2026</strong>
            </div>
          </div>

          <div className="info-line"></div>

          <div className="event-info-item">
            <div className="info-icon">
              📍
            </div>

            <div className="info-content">
              <small>VENUE</small>
              <strong>THE LALIT, CHANDIGARH</strong>
            </div>
          </div>

        </div>

        {/* Main Booking Card */}
        <div className="main-booking">

          <div className="booking-content">
            <span className="ticket-title">
              BOOK YOUR TICKETS
            </span>

            <p>
              Choose your preferred booking platform
            </p>
          </div>

          <Button
            component={Link}
            to="/booking"
            className="main-book-button"
            
          >
            Book Now
            <span>→</span>
          </Button>

        </div>

        {/* External Booking Platforms */}
        <div className="platform-section">

          <p className="platform-heading">
            ALSO AVAILABLE ON
          </p>

          <div className="platform-buttons">

            {/* BookMyShow */}
            <a
              href="https://in.bookmyshow.com/activities/orange-petal-dandiya-night-2026/ET00518358"
              target="_blank"
              rel="noopener noreferrer"
              className="platform-card"
            >
              <div className="platform-icon bms-icon">
                BMS
              </div>

              <div className="platform-text">
                <span>Book tickets on</span>
                <strong>BookMyShow</strong>
              </div>

              <span className="platform-arrow">
                ↗
              </span>
            </a>

            {/* District */}
            <a
              href="https://www.district.in/events/orange-petal-dandiya-night-2026-oct18-2026-buy-tickets"
              target="_blank"
              rel="noopener noreferrer"
              className="platform-card"
            >
              <div className="platform-icon district-icon">
                D
              </div>

              <div className="platform-text">
                <span>Book tickets on</span>
                <strong>District</strong>
              </div>

              <span className="platform-arrow">
                ↗
              </span>
            </a>

            {/* Swiggy Scenes */}
            <a
              href="https://r.swiggy.com/v1/swiggy/scenes/comms/100125343"
              target="_blank"
              rel="noopener noreferrer"
              className="platform-card"
            >
              <div className="platform-icon swiggy-icon">
                S
              </div>

              <div className="platform-text">
                <span>Book tickets on</span>
                <strong>Swiggy Scenes</strong>
              </div>

              <span className="platform-arrow">
                ↗
              </span>
            </a>

          </div>
        </div>

        {/* Bottom Highlights */}
        <div className="garba-bottom">
          <span>✦ MUSIC</span>
          <span>✦ DANCE</span>
          <span>✦ FESTIVAL</span>
          <span>✦ CELEBRATION</span>
        </div>

      </div>
    </section>
  );
};

export default GarbaBanner;