import React, { useRef,useState } from "react";
import { Box, Typography, Divider , Grid,
  styled} from "@mui/material";
import Screen from "../assets/Scene.gif"
import TeamExp from "../assets/TeamExp.gif";
import Network from "../assets/network.gif";
import servicess from "../assets/service.gif";
import Integration from "../assets/Integration.gif";
import Tech from "../assets/Tech.gif";
import TechReview from "../assets/TechRev.gif";
import CircularProgress from "@mui/material/CircularProgress";


const services = [
  {
    icon: `${Screen}`,
    title: "Proven Track Record",
    description:
      "With 2+ years of experience and 25+ successful events, we have the expertise to handle any challenge and exceed your expectations. Our portfolio includes luxury weddings, international destination celebrations, high-profile corporate events, private parties, and major concert productions.",
  },
  {
    icon: `${TeamExp}`,
    title: "Expert Team",
    description:
      "Our certified event planners and coordinators bring decades of combined experience across all event categories. We invest in continuous training and industry certifications to ensure our team stays current with best practices and emerging trends.",
  },
  {
    icon: `${Network}`,
    title: "Vendor Network",
    description:
      "We maintain relationships with premium vendors, venues, and service providers across multiple locations, ensuring access to the best resources for your event. Our vendor partnerships enable us to negotiate favorable rates while maintaining quality standards.",
  },
  {
    icon: `${servicess}`,
    title: "Personalized Service",
    description:
      "We believe every client deserves individual attention. Our dedicated account managers work closely with you throughout the planning process, ensuring clear communication and seamless coordination from initial consultation to post-event follow-up.",
  },
  {
    icon: `${Integration}`,
    title: "Technology Integration",
    description:
      "Our event management platform provides real-time updates, budget tracking, timeline management, and seamless communication tools. Clients have 24/7 access to their event details through our secure client portal.",
  },
  {
    icon: `${Tech}`,
    title: "Technology Assessment & Reviews",
    description:
      "In-depth audits to evaluate performance, security, and scalability.",
  },
  {
    icon: `${TechReview}`,
    title: "Managed Services",
    description: "24/7 operational support, monitoring, and enhancement.",
  },
];


const stats = [
    { number: "40+", label: " Satisfied Clients" },
    { number: "70+", label: "Events Planned" },
    { number: "21+", label: "Team Members" },
    { number: "4.8", label: "Customer Rating" },
    { number: "2+", label: "Years of Experience" },
    { number: "50+", label: "Successful Projects" },
  ];


const WhatWeDo = () => {
  const sectionRef = useRef(null);
  const serviceRefs = useRef([]);
  const [loading, setLoading] = useState(true);


  // Create a ref for each service item
  serviceRefs.current = services.map(
    (_, i) => serviceRefs.current[i] || React.createRef()
  );

  return (
    <Box
      sx={{
        color: "#fff",
        pt: { xs: 8, md: 10 },
        pb: { xs: 8, md: 22.625 },
        px: { xs: 2, sm: 4 },
        textAlign: "center",
        backgroundColor: "#f7be97",
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
              WHAT WE{" "}
              <Box
                component="span"
                sx={{
                  color: "#e67626",
                  fontFamily: '"Sansation", sans-serif',
                  fontSize: "20px",
                  fontWeight: 550,
                }}
              >
                DO
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
                Our Expertise
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
                Your Advantage
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
              We stay ahead of industry trends, incorporating the latest event
              technology, sustainable practices, and innovative design concepts
              to create truly unique experiences. Our creative team transforms
              ordinary spaces into extraordinary environments that reflect your
              personal style or brand identity.
            </Typography>
          </Box>

          {/* Content area */}

          {/* Left: Services */}
          <div className="services-container">
            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                mb: 1,
                fontSize: "2rem",
                fontFamily: '"Sansation", sans-serif',
                color: "#000000",
              }}
            >
              Core{" "}
              <Box
                component="span"
                sx={{ color: "#e67626", fontFamily: '"Sansation", sans-serif' }}
              >
                Services
              </Box>
            </Typography>

            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                color: "#000000",
                mb: 3,
                fontSize: "1rem",
                fontFamily: '"Sansation", sans-serif',
                fontWeight: 400,
              }}
            >
              "Make smarter decisions, streamline operations, and scale with
              confidence."
            </Typography>
            <Divider sx={{ bgcolor: "#39394d", my: 2 }} />

            {/* Services list */}
            <Box>
              {services.map((service, idx) => (
                <Box
                  key={service.title}
                  sx={{ mb: 3 ,alignItems: "center"}}
                  ref={serviceRefs.current[idx]}
                  id={idx === 5 ? "llm-service" : ""}
                  
                > 
                {loading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.7)",
              borderRadius: "8px",
            }}
          >
            <CircularProgress size={40} />
          </Box>
        )}
                 <img
            src={service.icon}
            alt={service.title}
            style={{ width: "180px", height: "180px" }}
             onLoad={() => setLoading(false)}
          />
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                 
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: "#e67626",
                        fontWeight: 550,
                        fontSize: "22px",
                        fontFamily: '"Sansation", sans-serif',
                        pb: 1,
                        textAlign: "center", // this centers text horizontally
    width: "100%",   

                      }}
                    >
                      {service.title}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#000000",
                      fontSize: "1rem",
                      fontWeight: 400,
                      pl: 5,
                      pb: 2,
                      fontFamily: '"Sansation", sans-serif',
                    }}
                  >
                    {service.description}
                  </Typography>
                  {idx < services.length - 1 && (
                    <Divider sx={{ bgcolor: "#39394d", my: 2 }} />
                  )}
                </Box>
              ))}
            </Box>
          </div>
        </div>
      </div>
       <Grid
  container
  sx={{
    ...statisticsContainer,
    backgroundColor: "#ff8c42",
    background:
      "linear-gradient(#EEEEEE, #ff8c42) padding-box, linear-gradient(90.31deg, rgba(208, 209, 210, 0.4) 100%, rgba(208, 209, 210, 0.2) 100%) border-box",
  }}
>
  {stats.map((stat, index) => (
    <Grid
      item
      xs={6}
      sm={4}
      md={2.4}
      key={index}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatBox>
        <Typography
          variant="h3"
          sx={{
            ...statNumber,
            color: "#252525",
            fontSize: {
              xs: "1.5rem",
              sm: "1.8rem",
              md: "2rem",
              lg: "2.2rem",
            },
          }}
        >
          {stat.number}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            ...statLabel,
            color: "#252525",
            fontSize: {
              xs: "0.75rem",
              sm: "0.85rem",
              md: "0.9rem",
              lg: "1rem",
            },
          }}
        >
          {stat.label}
        </Typography>
      </StatBox>
    </Grid>
  ))}
</Grid>

    </Box>
  );
};

export default WhatWeDo;


const StatBox = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(2),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiTypography-h3": {
    fontWeight: 700,
    background: `black`,
    font: "Space Grotesk",
    WebkitBackgroundClip: "text",
    marginBottom: theme.spacing(1),
  },
}));

const statisticsContainer = {
  display: "flex",
  justifyContent: "space-between",
  borderRadius: "8px",
  border: "0.1px solid #D0D1D2",
  width: "100%",
  height: "auto",
  mt: { xs: 4, sm: 6, md: 10 },
  borderImage:
    "linear-gradient(90.31deg, rgba(208, 209, 210, 0.4) 8%, rgba(208, 209, 210, 0.2) 100%) 1500",
  p: { xs: 2, sm: 2, md:0 },
  gap: { xs: 2, sm: 3, md: 4 },
};

const statNumber = {
  fontWeight: 700,
  fontFamily: "var(--fontFamilyTwo--)",
};

const statLabel = {
  fontFamily: "var(--fontFamilyTwo--)",
};
