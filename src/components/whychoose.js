import React from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
 
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Link } from 'react-router-dom';


const reasons = [
  "Wedding Planning: From intimate ceremonies to lavish receptions",
  "Destination Wedding Coordination: Seamless planning across global locations",
  "Private Party Management: Birthday celebrations, anniversaries, and special occasions",
  "Concert Production: Music festivals, performances, and entertainment events",
  "Corporate Event Services: Meetings, conferences, product launches, and team building"
];

const WhyChoose = () => {



  return (
    <Box
      sx={{
        bgcolor: "#f7d3ba",
        pt: 12,
        px: { xs: 2, sm: 3, md: 6},
        pb:16,
        pr:{xs: 6},
        marginTop:{xs: "-33px", sm: "0px", md: "0px"},

      }}
    >
      <Container
        maxWidth={false}
        sx={{
          px: { xs: 2, sm: 3, md: 4 },
          maxWidth: {
            xs: "100%",
            sm: "100%",
            md: "1100px",
            lg: "1360px",
            xl: "1360px",
          },
          mx: "auto",
        }}
      >
        {/* Why Choose Card */}
        <Paper
          elevation={0}
          sx={{
            bgcolor: "#f7d3ba",
            borderRadius: { xs: "16px", sm: "20px", md: "24px" },
           background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            width: "100%",
            minHeight: { xs: "auto", md: "346px" },
            mx: "auto",
            p: { xs: 2, sm: 3, md: 2 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 4 },
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", md: "50%" },
              display: "flex",
              flexDirection: "column",
              alignItems: {
                xs: "center",
                sm: "center",
                md: "center",
                lg: "flex-start",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 400,
                mb: 1,
                color: "#000000",
                fontSize: { xs: "24px", sm: "28px", md: "32px" },
                textAlign: {
                  xs: "center",
                  sm: "center",
                  md: "center",
                  lg: "left",
                }, 
                fontFamily: '"Sansation", sans-serif',
                
              }}
            >
              Why Choose Orange {" "}
              <Box component="span" sx={{ color: "#e67626" , fontFamily: '"Sansation", sans-serif',}}>
                Petal
              </Box>
            </Typography>

            <List
              dense
              sx={{
                width: {
                  xs: "100%",
                  sm: "80%", // narrower on tablets
                  md: "100%",
                },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                ml: 2,
              }}
            >
              {reasons.map((reason) => (
                <ListItem
                  key={reason}
                  sx={{
                    color: "#000000",

                    width: "100%",
                    pl: 0,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: { xs: 24, sm: 28, md: 32 },
                      display: "flex",
                      justifyContent: "center",
                     
                    }}
                  >
                    <CheckCircleOutlineIcon
                      sx={{
                        color: "#e67626",
                        fontSize: { xs: "18px", sm: "20px", md: "24px" },
                        marginRight: 1,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={reason}
                    primaryTypographyProps={{
                      fontSize: { xs: "16px", sm: "18px", md: "20px" },
                      textAlign: { xs: "center", sm: "center", md: "left" },
                        fontFamily: '"Sansation", sans-serif',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box
            sx={{
              textAlign: {
                xs: "center",
                sm: "center",
                md: "right",
                lg: "center",
              },
              mt: { xs: 2, md: 0 },
              width: { xs: "100%", md: "50%" },
              pr: { xs: 0, md: 2, lg: "8px" },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#000000",
                fontWeight: 400,
                mb: 2,
                textAlign: {
                  xs: "center",
                  sm: "center",
                  md: "right",
                  lg: "center",
                },
                fontSize: { xs: "28px", sm: "34px", md: "40px" },
                lineHeight: { xs: "32px", sm: "40px", md: "56px" },
              fontFamily: '"Sansation", sans-serif',
              }}
            >
              "Let's transform your event into a memorable experience
              <br />
              together"
            </Typography>
            <Button
              key={"/contact"}
              component={Link}
              to={'/contact'}
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
              Contact Us
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default WhyChoose;
