import React, { useRef,useState } from 'react';
import emailjs from 'emailjs-com';
import { Alert, Snackbar,CircularProgress } from '@mui/material';
import './Contact.css';

const Contact = () => {
  const form = useRef();
   const [alert, setAlert] = useState({ open: false, severity: 'success', message: '' });
   const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
 setLoading(true);
    emailjs
      .sendForm(
        'service_vyeu6jp', // from EmailJS dashboard
        'template_z7knbz4', // from EmailJS dashboard
        form.current,
        'dlq62CWkZS1TjLiAG' // from EmailJS dashboard
      )
     .then((result) => {
      setAlert({ open: true, severity: 'success', message: 'Message sent successfully!' });
      form.current.reset();
      setLoading(false);
    }, (error) => {
      console.error(error);
      setAlert({ open: true, severity: 'error', message: 'Failed to send message. Please try again.' });
      setLoading(false);
    });
  };
const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <div className="contact-content">
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you! Reach out to us for inquiries or bookings.</p>
          <ul>
            <li>Email: info.upasana@orangepetal.in</li>
            <li>Phone: +91 8920742226</li>
            <li>Address: Chawla Complex, Zirakpur, Chandigarh Road, Near KMG Hotel Zirakpur-140603</li>
          </ul>
        </div>
        <form ref={form} onSubmit={sendEmail} className="contact-form">
          <label>Name :</label>
          <input type="text" name="name" placeholder="Your Name" required />
          <label>Mobile No. :</label>
           <input type="tel" name="phone" placeholder="Your Mobile No." required />
          <label>Email :</label>
          <input type="email" name="email" placeholder="Your Email" required />
          <label>Message :</label>
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit" disabled={loading}>
            {loading ? <CircularProgress size={20} style={{ color: 'white' }} /> : 'Submit'}
          </button>
        </form>
      </div>

       <Snackbar
        open={alert.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Contact;
