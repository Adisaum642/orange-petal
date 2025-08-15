import React ,{ useState }from 'react';
import './Home.css'; // Add a separate CSS file for Home page styling
import heroVideo from '../assets/bg-video.mp4';
import logo from '../assets/logo.png'
import WhoWeAre from './whoweare';
import WhatWeDo from '../components/whatwedo';
import WhatSetsUs from '../components/WhatSetsUs';
import AboutUs from '../components/Aboutus'; 
import WhyChoose from '../components/whychoose';
import { Box} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";


const Home = () => {
    const [loading, setLoading] = useState(true);



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
          {loading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "transparent",
              borderRadius: "8px",
            }}
          >
            <CircularProgress size={40} />
          </Box>
        )}
        <img src={logo} alt="orange petal logo" className="navbar-logo2"  onLoad={() => setLoading(false)}/>
          <h1>Welcome to Orange Petal</h1>
          <p>Your dream events, beautifully executed.</p>
          <button className="cta-button">Explore Our Services</button>
        </div>
      </div>
<div className="services-section"><WhoWeAre/></div>
<div className="services-section"><WhatWeDo/></div>
<div className="services-section"><WhatSetsUs/></div>
      <div className="about-section">
        {/* <h2>About Us</h2>
        <p>
          At Orange Petal, we specialize in creating unforgettable moments. From intimate
          gatherings to grand celebrations, our team ensures every detail is perfect.
        </p>
        <img
          src={about} // Replace with an about image
          alt="About Us"
          className="about-image"
        /> */}
        <AboutUs />
      </div>
      <div className="why-choose-section">
        <WhyChoose />
      </div>
    
    </div>
  );
};

export default Home;