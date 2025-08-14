import React, { useRef,useState } from "react";
import { Box, Typography, Divider ,Grid} from "@mui/material";
import yellowFlower from  "../assets/yellowFlower.jpg"; 
import ringHand from "../assets/ring.jpeg"; 
import mission from "../assets/ourMissionImage.jpg";
import gole from "../assets/gole.jpg";
import storyHand from "../assets/storyHand.jpg"; 
import storyImg from "../assets/storyImg.jpg";
import CircularProgress from "@mui/material/CircularProgress";



const WhatWeDo = () => {
    const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);


  
 

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
       
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 500,
                mb: 2,
                fontFamily: '"Sansation", sans-serif',
                fontSize: "30px",
                color: "#000000",
                marginLeft: {xs: "0", md:"400px" }
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
 <Grid container spacing={4} alignItems="center">
           
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
            
                <Box
                  sx={{
                    width: {xs: "90%", md: "100%" }, // Adjust width for smaller screens
                    //maxWidth: "1000px",
                    height: "300px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(${yellowFlower})`, // Add your image here
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onLoad={() => setLoading(false)}
                >
                 
                
                  <Typography sx={{ color: "#999" , width:"500px"}}></Typography>
                </Box>
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
           
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-30px",
                    left: {xs: "-5px", md: "-30px" }, // Adjust position for smaller screens
                    width: {xs: "100px", md: "120px" }, // Adjust size for smaller screens
                    height:{xs: "100px", md: "120px" } ,
                    borderRadius: "50%",
                    backgroundColor: "#d0d0d0",
                    border: "4px solid #fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(${ringHand})`, // Add your image here
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onLoad={() => setLoading(false)}
                >
              
                
                </Box>
              </Box>
            </Grid>

        
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  variant="body1"
                  sx={{
                     fontStyle: "italic",
                    color: "#000000",
                    fontSize: "18px",
                    fontFamily: '"Sansation", sans-serif',
                    lineHeight: 1.6,
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
            </Grid>
          </Grid>
          </Box>
 <Divider sx={{ bgcolor: "#39394d", my: 2 }} />
       

       
          <div className="services-container">
            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                mb: 1,
                fontSize: "2rem",
                fontFamily: '"Sansation", sans-serif',
                color: "#000000",
                marginRight:{xs: "0", md:"550px"},
                marginTop: {xs: "0px", md: "60px"},
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

 <Grid container spacing={4} alignItems="center">
          

             <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  variant="body1"
                  sx={{
                     fontStyle: "italic",
                    color: "#000000",
                    fontSize: "18px",
                    fontFamily: '"Sansation", sans-serif',
                    lineHeight: 1.6,
                  }}
                >
                 To create extraordinary events that celebrate life's most
              important moments while delivering exceptional value and peace of
              mind to our clients. We are committed to turning your dreams into
              reality through meticulous planning, creative innovation, and
              flawless execution.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
             
                <Box
                  sx={{
                     width: {xs: "90%", md: "100%" },
                 
                    height: "300px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(${mission})`, // Add your image here
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onLoad={() => setLoading(false)}
                >
                 
               
                  <Typography sx={{ color: "#999" , width:"500px"}}></Typography>
                </Box>
                
          
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-30px",
                   left: {xs: "-5px", md: "-30px" }, // Adjust position for smaller screens
                    width: {xs: "100px", md: "120px" }, // Adjust size for smaller screens
                    height:{xs: "100px", md: "120px" } ,
                    borderRadius: "50%",
                    backgroundColor: "#d0d0d0",
                    border: "4px solid #fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(${gole})`, // Add your image here
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onLoad={() => setLoading(false)}
                >
                 
                
                </Box>
              </Box>
            </Grid>

          
           
          </Grid>


           
 <Divider sx={{ bgcolor: "#39394d", my: 2 ,marginTop:"50px"}} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 500,
                mb: 1,
                fontSize: "2rem",
                fontFamily: '"Sansation", sans-serif',
                color: "#000000",
                  marginTop: {xs: "0px", md: "60px"},
                     marginLeft: {xs: "0", md:"400px" },
                     marginBottom: {xs: "20px", md: "20px" }
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
 <Grid container spacing={4} alignItems="center">
         
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Main event image placeholder */}
                <Box
                  sx={{
                    width: {xs: "90%", md: "100%" },
                    height: "300px",
                    backgroundColor: "#e0e0e0",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(${storyImg})`, // Add your image here
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onLoad={() => setLoading(false)}
                >
                  
                  <Typography sx={{ color: "#999" , width:"500px"}}></Typography>
                </Box>
                
             
                <Box
                  sx={{
                    position: "absolute",
                    bottom: "-30px",
                    left: {xs: "-5px", md: "-30px" }, // Adjust position for smaller screens
                    width: {xs: "100px", md: "120px" }, // Adjust size for smaller screens
                    height:{xs: "100px", md: "120px" } ,
                    borderRadius: "50%",
                    backgroundColor: "#d0d0d0",
                    border: "4px solid #fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundImage: `url(${storyHand})`, // Add your image here
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onLoad={() => setLoading(false)}
                >
               
                
                </Box>
              </Box>
            </Grid>

          
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  variant="body1"
                  sx={{
                     fontStyle: "italic",
                    color: "#000000",
                    fontSize: "18px",
                    fontFamily: '"Sansation", sans-serif',
                    lineHeight: 1.6,
                  }}
                >
                   Founded with a passion for creating magical moments, our event
              planning company has grown from humble beginnings to become a
              trusted partner for clients seeking exceptional event experiences.
              We understand that every celebration, gathering, and corporate
              function represents important milestones in people's lives and
              businesses. Our journey began with a simple belief: every event,
              regardless of size or budget, deserves meticulous planning,
              creative execution, and flawless delivery. 
                </Typography>
              </Box>
            </Grid>
          </Grid>
           
          </div>
        </div>
      </div>
    </Box>
  );
};

export default WhatWeDo;
