// GarbaBanner.js
import React from 'react';
import './GarbaBanner.css';
import {Button,} from "@mui/material";
import { Link } from 'react-router-dom'; // We'll keep styles here

const GarbaBanner = () => {
  return (
    <div className="banner-container" style={{ backgroundImage: `url(https://aicdn.picsart.com/4232a907-b3be-471d-8d2d-6244be9fe231.jpg)` }}>
     
      <div className="overlay">
        <h1>Celebrate Garba Dance Night!</h1>
        <p>Join us for a vibrant evening filled with rhythm, colors, and festive energy!</p>
         <Button
              key={"/booking"}
              component={Link}
              to={'/booking'}
              variant="outlined"
              sx={{
                width: { xs: "120px", sm: "130px", md: "143px" },
                height: { xs: "36px", sm: "38px", md: "40px" },
                color: "#000000",
                border: "1.5px solid #000000",
                borderRadius: "8px",
                textTransform: "none",
                mt: { xs: 2, sm: 3, md: 4 },
                px: { xs: 2, sm: 2.5, md: 3 },
                py: 1,
                pb:"35px",
                fontSize: { xs: "14px", sm: "15px", md: "16px" },
                fontWeight: 400,
                "&:hover": {
                  borderColor: "#000",
                  bgcolor: "#e67626",
                },
                bgcolor:"#ff8c42",
                display: "inline-block",
                mx: { xs: "auto", sm: "auto", md: 0 },
                fontFamily:  '"Sansation", sans-serif',
              }}
            >
             Book Now
            </Button>
      </div>
    </div>
  );
};

export default GarbaBanner;
