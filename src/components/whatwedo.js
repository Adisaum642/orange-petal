import React, { useRef,useState } from "react";
import { Box, Typography, Divider , Grid,
  styled} from "@mui/material";

import CircularProgress from "@mui/material/CircularProgress";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';



const services = [
  {
    icon: <DotLottieReact
      src="https://lottie.host/cae0c216-eb88-4db6-968e-692d175a7426/hdlUJVbRud.lottie"
      loop
      autoplay
      style={{ width: "180px", height: "180px",alignItems: "center", }}
    />,
    title: "Proven Track Record",
    description:
      "With 2+ years of experience and 25+ successful events, we have the expertise to handle any challenge and exceed your expectations. Our portfolio includes luxury weddings, international destination celebrations, high-profile corporate events, private parties, and major concert productions.",
  },
  {
    icon:  <DotLottieReact
           src="https://lottie.host/b933eadb-a63d-49bd-bd79-5f2a8f407b92/3dqYt6EAfM.lottie"

      loop
      autoplay
      style={{ width: "250px", height: "250px",alignItems: "center", }}
    />,
    title: "Expert Team",
    description:
      "Our certified event planners and coordinators bring decades of combined experience across all event categories. We invest in continuous training and industry certifications to ensure our team stays current with best practices and emerging trends.",
  },
  {
    icon: <DotLottieReact
    src="https://lottie.host/8ce1a144-bfeb-4bc0-b5c7-98aea7c98bc5/Y4yFGTMRdX.lottie"
      loop
      autoplay
      style={{ width: "180px", height: "180px",alignItems: "center", }}
    />,
    title: "Vendor Network",
    description:
      "We maintain relationships with premium vendors, venues, and service providers across multiple locations, ensuring access to the best resources for your event. Our vendor partnerships enable us to negotiate favorable rates while maintaining quality standards.",
  },
  {
    icon: <DotLottieReact
     src="https://lottie.host/ad04dafc-a3d5-4ab0-94ef-9e9cbc9276a6/hFAE4JbW4D.lottie"
      loop
      autoplay
      style={{ width: "180px", height: "180px",alignItems: "center", }}
    />,
    title: "Personalized Service",
    description:
      "We believe every client deserves individual attention. Our dedicated account managers work closely with you throughout the planning process, ensuring clear communication and seamless coordination from initial consultation to post-event follow-up.",
  },
  {
    icon: <DotLottieReact
      src="https://lottie.host/d710ce1a-0d12-4064-bbe2-f635a0ed1e63/NHQvHpHViH.lottie"
      loop
      autoplay
      style={{ width: "180px", height: "180px",alignItems: "center", }}
    />,
    title: "Technology Integration",
    description:
      "Our event management platform provides real-time updates, budget tracking, timeline management, and seamless communication tools. Clients have 24/7 access to their event details through our secure client portal.",
  },
  {
    icon: <DotLottieReact
      src="https://lottie.host/3e95ddb0-9d4b-48d6-a695-31c068f6f92a/AKzFc0sJDk.lottie"
      loop
      autoplay
      style={{ width: "180px", height: "180px",alignItems: "center", }}
    />,
    title: "Technology Assessment & Reviews",
    description:
      "In-depth audits to evaluate performance, security, and scalability.",
  },
  {
    icon: <DotLottieReact
      src="https://lottie.host/d682bc90-da37-4aed-9247-4fd339a14069/hqlv4JG6e1.lottie"
      loop
      autoplay
      style={{ width: "180px", height: "180px",alignItems: "center", }}
    />,
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
  const [loading, setLoading] = useState(false);


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
              backgroundColor: "transparent",
              borderRadius: "8px",
            }}
          >
            <CircularProgress size={40} />
          </Box>
        )}
        <div style={{
  display: "flex",
  justifyContent: "center", 
  alignItems: "center", 
      
}}
 onLoad={() => setLoading(false)}>
      {service.icon}</div>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                    {/* {service.icon} */}
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
                      pr:5,
                      pb: 2,
                      fontFamily: '"Sansation", sans-serif',
                       textAlign: "center", // this centers text horizontally
 
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
       <div>
      <DotLottieReact
      src="https://lottie.host/5aef2b64-fd20-4e87-bec0-4eeead933272/I9gpYVofN7.lottie"
      loop
      autoplay
      style={{ width:"75%", height: "100%", paddingLeft:"55px"}}
      onLoad={() => setLoading(false)}
    />
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
  width: {xs : "100%",sm: "93%", md : "1123px"},

    ml:{xs: 0 , sm: "39px",md: "137px"},
  height: "auto",
  mt: { xs: -1.3, sm: -6, md: -4 },
  borderImage:
    "linear-gradient(90.31deg, rgba(208, 209, 210, 0.4) 8%, rgba(208, 209, 210, 0.2) 100%) 1500",
  p: { xs: 2, sm: 2, md:0 },
  gap: { xs: 2, sm: 3, md: 0 },
};

const statNumber = {
  fontWeight: 700,
  fontFamily: "var(--fontFamilyTwo--)",
};

const statLabel = {
  fontFamily: "var(--fontFamilyTwo--)",
};
