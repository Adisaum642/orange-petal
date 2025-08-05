import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { steps } from "../utils/whowearedata";

const WhoWeAre = () => (
  <Box
    sx={{
      color: "#fff",
      pt: { xs: 8, md: 10 },
      pb: { xs: 8, md: 22.625 },
      px: { xs: 2, sm: 4 },
      textAlign: "center",
      backgroundColor: "#f7d3ba",
    }}
  >
    <Typography
      variant="h4"
      sx={{
        fontWeight: 500,
        mb: 3,
        fontSize: "20px",
        color: "#000000",
        fontFamily: '"Sansation", sans-serif',
      }}
    >
      CORE{" "}
      <Box
        component="span"
        sx={{ color: "#e67626", fontFamily: '"Sansation", sans-serif' }}
      >
        {" "}STRATEGIES
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
        color: "#000",
        fontSize: "0.875rem", // 14px
        marginTop: "20px",
        marginBottom: "65px",
        fontWeight: 300,
      }}
    >
      <Typography
        component="span"
        sx={{ mx: 1, fontFamily: '"Sansation", sans-serif', fontWeight: 300 }}
      >
        Smart
      </Typography>
      <Typography
        component="span"
        sx={{
          mx: 1,
          color: "#777",
          fontFamily: '"Sansation", sans-serif',
          fontWeight: 300,
        }}
      >
        |
      </Typography>
      <Typography
        component="span"
        sx={{ mx: 1, fontFamily: '"Sansation", sans-serif', fontWeight: 300 }}
      >
        Seamless
      </Typography>
      <Typography
        component="span"
        sx={{
          mx: 1,
          color: "#777",
          fontFamily: '"Sansation", sans-serif',
          fontWeight: 300,
        }}
      >
        |
      </Typography>
      <Typography
        component="span"
        sx={{ mx: 1, fontFamily: '"Sansation", sans-serif', fontWeight: 300 }}
      >
        Scalable
      </Typography>
    </Box>
    <Typography
      variant="body1"
      sx={{
        maxWidth: 1100,
        mx: "auto",
        mb: 2,
        fontSize: "20px",
        fontWeight: 400,
        color: "#000000",
        fontFamily: '"Sansation", sans-serif',
      }}
    >
      At Orange Petal, you're planning an intimate wedding, destination
      celebration, corporate conference, private party, or large-scale concert,
      our discovery process ensures every detail aligns with your vision. We
      conduct comprehensive consultations, site visits, and stakeholder
      interviews to gather crucial insights that inform our strategic approach.
    </Typography>

    <Grid
      container
      spacing={12}
      justifyContent="center"
      sx={{ paddingTop: "60px" }}
    >
      {steps.map((step) => (
        <Grid item xs={12} sm={6} md={3} key={step.title}>
          <Box sx={{ textAlign: "left", maxWidth: 250, mx: "auto" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                mb: "32px",
                fontWeight: 300,
              }}
            >
              <Box>{step.icon}</Box>
              <Typography
                sx={{
                  color: "#e67626",
                  fontWeight: 500,
                  fontSize: "22px",
                  fontFamily: '"Sansation", sans-serif',
                }}
              >
                {step.title}
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "#000000",
                fontWeight: 400,
                fontSize: "16px",
                fontFamily: '"Sansation", sans-serif',
                mb: 6,
              }}
            >
              {step.description}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontStyle: "italic",
                color: "#000000",
                fontWeight: 400,
                fontSize: "16px",
                fontFamily: '"Sansation", sans-serif',
              }}
            >
              {step.quote}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default WhoWeAre;
