import React from 'react';
import './Contact.css'; // Add a separate CSS file for Contact page styling

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you! Reach out to us for inquiries or bookings.</p>
          <ul>
            <li>Email: info@orangepetal.com</li>
            <li>Phone: +91 8920742226</li>
            <li>Address: Chawla Complex, Zirakpur, Chandigarh Road, Near KMG Hotel Zirakpur-140603</li>
          </ul>
        </div>
        <form className="contact-form">
          <label>Name:</label>
          <input type="text" name="name" placeholder="Your Name" required />
          <label>Email:</label>
          <input type="email" name="email" placeholder="Your Email" required />
          <label>Message:</label>
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;