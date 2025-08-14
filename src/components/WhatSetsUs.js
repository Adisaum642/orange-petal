import React, { useRef, useState } from "react";
import { Box, Typography, Divider, Skeleton } from "@mui/material";
import imageTest from "../assets/uphand.jpg";
import table from "../assets/Table.jpg";
import flower from "../assets/flowerTable.jpg";
import coupleHand from "../assets/coupleHand.webp";
import preWeeding from "../assets/pre-weeding.jpg";
import birthday from "../assets/birthday.jpg";
import photoShot from "../assets/photoShot.jpg";

const services = [
  {
    image: imageTest,
    title: "Comprehensive Event Expertise - From Weddings to Corporate Events",
    description:
      "Wedding Planning From intimate ceremonies to lavish receptions Destination Wedding Coordination Seamless planning across global locations Private Party Management Birthday celebrations, anniversaries, and special occasions, Concert Production Music festivals, performances, and entertainment events, Corporate Event Services: Meetings, conferences, product launches.Leverage our extensive comprehensive event planning expertise across all celebration categories with our seasoned professionals who excel in weddings, destination weddings, corporate meetings, private parties, and concert productions.",
  },
  {
    image: table,
    title: "End-to-End Service Excellence - Your One-Stop Event Solution",
    description:
      "Our full-service event planning approach means you can rely on us for every aspect of your event. We handle venue selection, vendor coordination, logistics management, design implementation, and day-of execution with the same level of dedication and attention to detail. Experience seamless celebrations with our comprehensive end-to-end event management services that handle every aspect of your special occasion from initial consultation to post-event follow-up. Our full-service event planning approach ensures you can relax and enjoy your celebration while we manage all the intricate details.",
  },
  {
    image: flower,
    title: "Innovative Design & Technology - Creating Future-Forward Celebrations",
    description:
      "We stay ahead of industry trends, incorporating the latest event technology, sustainable practices, and innovative design concepts to create truly unique experiences. Our creative team transforms ordinary spaces into extraordinary environments that reflect your personal style or brand identity. Transform your events into extraordinary experiences with our cutting-edge innovative design and technology solutions. We seamlessly integrate advanced event technology, AI-powered personalization, virtual reality experiences, and smart event management systems to create immersive celebrations.",
  },
  {
    image: coupleHand,
    title:
      "Traditional Indian Wedding Expertise - Creating Authentic Ceremonies with Modern Excellence",
    description:
      "Our comprehensive Indian wedding services cover every aspect of your sacred celebration, from pre-wedding ceremonies to post-wedding rituals. We understand the significance of each Indian marriage tradition and ensure every element is executed with cultural authenticity and spiritual reverence. Celebrate your heritage with our specialized Traditional Indian Wedding Planning services that honor time-tested customs while embracing contemporary elegance. Our expert team brings deep cultural knowledge and extensive experience in Indian marriage traditions, ensuring every ritual is performed.",
  },
  {
    image: preWeeding,
    title: "Pre-Wedding Photoshoot Services - Capture Your Love Story",
    description:
      "Transform your engagement into a beautiful visual narrative with our professional pre-wedding photography services. Our experienced photographers specialize in creating stunning couple photoshoots that perfectly capture your unique love story before your special day. We offer diverse pre-wedding shoot concepts including romantic outdoor sessions, traditional Indian themes, modern urban backdrops, and destination photography. From intimate engagement photos to elaborate couple portraits, our creative team works with you to design personalized shoots that reflect your personality and style",
  },
  {
    image: birthday,
    title: "Birthday Party - Celebrate Every Milestone in Style",
    description:
      "Make your special day unforgettable with our comprehensive birthday party planning services. From intimate family gatherings to grand celebration parties, we create personalized birthday events that reflect your unique style and bring your vision to life. Our expert birthday party planners handle everything from venue selection and themed decorations to entertainment coordination and catering arrangements. Whether you're planning a kids birthday party with fun activities and games, an elegant adult birthday celebration, or a milestone surprise party, we ensure every detail is perfectly executed",
  },
  {
    image: photoShot,
    title: "Professional Photography - Capturing Every Perfect Moment",
    description:
      "Elevate your events with our specialized professional photography services and expert photo shoot event management. We seamlessly blend event coordination with stunning photography to document your special occasions while ensuring flawless execution. Our comprehensive event photography management includes pre-event planning, on-site coordination, and professional photo documentation for weddings, corporate events, parties, concerts, and special celebrations.",
  },
];

const WhatWeDo = () => {
  const sectionRef = useRef(null);
  const serviceRefs = useRef([]);

  // Track loading states for each image
  const [loadedImages, setLoadedImages] = useState(Array(services.length).fill(false));

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => {
      const newArr = [...prev];
      newArr[index] = true;
      return newArr;
    });
  };

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
          </Box>

          <Divider sx={{ bgcolor: "#39394d", my: 2 }} />

          {/* Services list */}
          <Box>
            {services.map((service, idx) => (
              <Box
                key={service.title}
                sx={{
                  display: "flex",
                  flexDirection: idx % 2 === 0 ? "row" : "row-reverse",
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
                  flexWrap: "wrap",
                }}
              >
                {/* Image Section */}
                <Box
                  sx={{
                    width: "300px",
                    height: "300px",
                    position: "relative",
                    borderRadius: "12px",
                    overflow: "hidden",
                    flexShrink: 0,
                    mb: { xs: 2, md: 0 },
                  }}
                >
                  {!loadedImages[idx] && (
                    <Skeleton
                      variant="rectangular"
                      width={300}
                      height={300}
                      sx={{ borderRadius: "12px" }}
                    />
                  )}
                  <Box
                    component="img"
                    src={service.image}
                    alt={service.title}
                    sx={{
                      width: "300px",
                      height: "300px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      display: loadedImages[idx] ? "block" : "none",
                    }}
                    onLoad={() => handleImageLoad(idx)}
                  />
                </Box>

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
    </Box>
  );
};

export default WhatWeDo;
