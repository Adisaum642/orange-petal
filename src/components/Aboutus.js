import React, { useRef } from "react";
import { Box, Typography, Divider } from "@mui/material";

const services = [
  {
    title: "Our Story",
    description:
      "With 2+ years of experience and 25+ successful events, we have the expertise to handle any challenge and exceed your expectations. Our portfolio includes luxury weddings, international destination celebrations, high-profile corporate events, private parties, and major concert productions.",
  },
  {
    title: "Expert Team",
    description:
      "Our certified event planners and coordinators bring decades of combined experience across all event categories. We invest in continuous training and industry certifications to ensure our team stays current with best practices and emerging trends.",
  },
  {
    title: "Vendor Network",
    description:
      "We maintain relationships with premium vendors, venues, and service providers across multiple locations, ensuring access to the best resources for your event. Our vendor partnerships enable us to negotiate favorable rates while maintaining quality standards.",
  },
  {
    title: "Personalized Service",
    description:
      "We believe every client deserves individual attention. Our dedicated account managers work closely with you throughout the planning process, ensuring clear communication and seamless coordination from initial consultation to post-event follow-up.",
  },
  {
    title: "Technology Integration",
    description:
      "Our event management platform provides real-time updates, budget tracking, timeline management, and seamless communication tools. Clients have 24/7 access to their event details through our secure client portal.",
  },
  {
    title: "Technology Assessment & Reviews",
    description:
      "In-depth audits to evaluate performance, security, and scalability.",
  },
  {
    title: "Managed Services",
    description: "24/7 operational support, monitoring, and enhancement.",
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
        pt: { xs: 8, md: 10 },
        pb: { xs: 8, md: 22.625 },
        px: { xs: 2, sm: 4 },
         marginTop:{xs: "-33px", sm: "0px", md: "0px"},
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
                fontSize: "30px",
                color: "#000000",
              }}
            >
              About{" "}
              <Box
                component="span"
                sx={{
                  color: "#e67626",
                  fontFamily: '"Sansation", sans-serif',
                  fontSize: "20px",
                  fontWeight: 550,
                }}
              >
                US
              </Box>
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#000000",
                maxWidth: 960,
                mx: "auto",
                fontSize: "18px",
                fontFamily: '"Sansation", sans-serif',
              }}
            >
              We are a leading event management company specializing in creating
              unforgettable experiences that exceed expectations and leave
              lasting impressions. From intimate wedding celebrations to grand
              destination weddings, exclusive private parties to spectacular
              concerts, and professional corporate meetings to large-scale
              conferences, we transform your vision into reality with unmatched
              precision and creativity.
            </Typography>
          </Box>
 <Divider sx={{ bgcolor: "#39394d", my: 2 }} />
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
              Our{" "}
              <Box
                component="span"
                sx={{ color: "#e67626", fontFamily: '"Sansation", sans-serif' }}
              >
                Mission
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
              To create extraordinary events that celebrate life's most
              important moments while delivering exceptional value and peace of
              mind to our clients. We are committed to turning your dreams into
              reality through meticulous planning, creative innovation, and
              flawless execution.
            </Typography>
 <Divider sx={{ bgcolor: "#39394d", my: 2 }} />
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
              Our{" "}
              <Box
                component="span"
                sx={{ color: "#e67626", fontFamily: '"Sansation", sans-serif' }}
              >
                Story
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
              Founded with a passion for creating magical moments, our event
              planning company has grown from humble beginnings to become a
              trusted partner for clients seeking exceptional event experiences.
              We understand that every celebration, gathering, and corporate
              function represents important milestones in people's lives and
              businesses. Our journey began with a simple belief: every event,
              regardless of size or budget, deserves meticulous planning,
              creative execution, and flawless delivery. This philosophy has
              guided us through thousands of successful events, earning us
              recognition as one of the premier event management services in the
              industry.
            </Typography>

            {/* Services list
            <Box>
              {services.map((service, idx) => (
                <Box
                  key={service.title}
                  sx={{ mb: 3 }}
                  ref={serviceRefs.current[idx]}
                  id={idx === 5 ? "llm-service" : ""}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "#e67626",
                      fontWeight: 550,
                      fontSize: "22px",
                      fontFamily: '"Sansation", sans-serif',
                      pb: 1,
                    }}
                  >
                    {service.title}
                  </Typography>

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
                </Box>
              ))}
            </Box> */}
          </div>
        </div>
      </div>
    </Box>
  );
};

export default WhatWeDo;
