import React, { useRef } from "react";
import { Box, Typography, Divider } from "@mui/material";
import imageTest from "../assets/uphand.jpg";
import table from "../assets/Table.jpg";
import flower from "../assets/flowerTable.jpg";
import coupleHand from "../assets/coupleHand.webp";
import preWeeding from "../assets/pre-weeding.jpg"

const services = [
  {
    image: imageTest, 
    title: "Comprehensive Event Expertise",
    description:
      "Wedding Planning From intimate ceremonies to lavish receptions Destination Wedding Coordination Seamless planning across global locations Private Party Management Birthday celebrations, anniversaries, and special occasions, Concert Production Music festivals, performances, and entertainment events, Corporate Event Services: Meetings, conferences, product launches, and team building",
  },
  {
   image: table,
    title: "End-to-End Service Excellence",
    description:
      "Our full-service event planning approach means you can rely on us for every aspect of your event. We handle venue selection, vendor coordination, logistics management, design implementation, and day-of execution with the same level of dedication and attention to detail.",
  },
  {
    image:flower,
    title: "Innovative Design & Technology",
    description:
      "We stay ahead of industry trends, incorporating the latest event technology, sustainable practices, and innovative design concepts to create truly unique experiences. Our creative team transforms ordinary spaces into extraordinary environments that reflect your personal style or brand identity.",
  },
 
  {
    image:coupleHand,
    title: "Traditional Indian Wedding Expertise",
    description:
      "Our comprehensive Indian wedding services cover every aspect of your sacred celebration, from pre-wedding ceremonies to post-wedding rituals. We understand the significance of each Indian marriage tradition and ensure every element is executed with cultural authenticity and spiritual reverence.",
  },
 
{
    image:preWeeding,
    title: "Pre-Wedding Photoshoot Services - Capture Your Love Story",
    description:
      "ransform your engagement into a beautiful visual narrative with our professional pre-wedding photography services. Our experienced photographers specialize in creating stunning couple photoshoots that perfectly capture your unique love story before your special day.",
  },

];

const WhatWeDo = () => {
  const sectionRef = useRef(null);
  const serviceRefs = useRef([]);

  // Create a ref for each service item
  serviceRefs.current = services.map(
    (_, i) => serviceRefs.current[i] || React.createRef()
  );

  return (
    <Box
      sx={{
        color: "#fff",
        pt: { xs: 4, md: 6 },
        pb: { xs: 8, md: 22.625 },
        px: { xs: 2, sm: 4 },
        textAlign: "center",
        backgroundColor: "#f7d3ba",
      }}
    >
      <div className="what-we-do-container" ref={sectionRef}>
        <div className="what-we-do-content">
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
                mb: 2,
                fontFamily: '"Sansation", sans-serif',
                fontSize: "20px",
                color: "#000000",
              }}
            >
              WHAT SETS{" "}
              <Box
                component="span"
                sx={{
                  color: "#e67626",
                  fontFamily: '"Sansation", sans-serif',
                  fontSize: "20px",
                  fontWeight: 550,
                }}
              >
                US PART
              </Box>
            </Typography>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid #e67626", // Adjust color to match your border
                borderRadius: "999px",
                px: 3,
                py: 1,
                // Match dark background
                color: "#000000",
                fontSize: "0.875rem", // 14px
                marginTop: "20px",
                marginBottom: "65px",
              }}
            >
              <Typography
                component="span"
                sx={{
                  mx: 1,
                  fontFamily: '"Sansation", sans-serif',
                  fontWeight: 400,
                }}
              >
                Innovative
              </Typography>
              <Typography
                component="span"
                sx={{
                  mx: 1,
                  color: "#777",
                  fontFamily: '"Sansation", sans-serif',
                  fontWeight: 400,
                }}
              >
                |
              </Typography>
              <Typography
                component="span"
                sx={{
                  mx: 1,
                  fontFamily: '"Sansation", sans-serif',
                  fontWeight: 400,
                }}
              >
                Full-Service
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: "#000000",
                maxWidth: 960,
                mx: "auto",
                fontSize: "20px",
                fontFamily: '"Sansation", sans-serif',
              }}
            >
              Let us bring your vision to life with our comprehensive event
              management services. Whether you're planning an intimate wedding,
              spectacular destination celebration, corporate meeting, exclusive
              party, or major concert, our experienced team is ready to create
              an extraordinary experience tailored to your unique needs and
              budget.
            </Typography>
          </Box>

          {/* Content area */}

          {/* Left: Services */}
          <div className="services-container">
       
            <Divider sx={{ bgcolor: "#39394d", my: 2 }} />

            {/* Services list */}
<Box>
  {services.map((service, idx) => (
    <Box
      key={service.title}
      sx={{
        display: "flex",
        flexDirection: idx % 2 === 0 ? "row" : "row-reverse", // alternate direction
        alignItems: "center",
        justifyContent: "space-between",
        mb: 5,
        p: 3,
        borderRadius: "16px",
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        flexWrap: "wrap", // so on mobile it wraps nicely
      }}
    >
      {/* Image Section */}
      <Box
        component="img"
        src={service.image}
        alt={service.title}
        sx={{
          width: "300px",
          height: "300px",
          objectFit: "cover",
          borderRadius: "12px",
          flexShrink: 0, // prevent shrinking
          mb: { xs: 2, md: 0 }, // margin bottom only on mobile
        }}
      />

      {/* Content Section */}
      <Box sx={{ flex: 1, pl: 3, pr: 3 }}>
        <Typography
          variant="h5"
          sx={{
            color: "#e67626",
            fontWeight: 600,
            fontFamily: '"Sansation", sans-serif',
            mb: 1,
          }}
        >
          {service.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#000000",
            fontSize: "1rem",
            fontWeight: 400,
            fontFamily: '"Sansation", sans-serif',
          }}
        >
          {service.description}
        </Typography>
      </Box>
    </Box>
  ))}
</Box>

          </div>
        </div>
      </div>
    </Box>
  );
};

export default WhatWeDo;
