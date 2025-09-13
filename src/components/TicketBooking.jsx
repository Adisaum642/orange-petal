// components/TicketBooking.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Alert,
  CircularProgress,
  Divider,
  Chip,
  Avatar,
  Container,
  IconButton,
  ButtonGroup,useMediaQuery, useTheme
} from '@mui/material';
import {
  CelebrationOutlined,
  PersonOutlined,
  EmailOutlined,
  PhoneOutlined,
  ConfirmationNumberOutlined,
  PaymentOutlined,
  CheckCircleOutlined,
  DownloadOutlined,
  QrCodeOutlined,
  PictureAsPdfOutlined,
  ImageOutlined
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import logo from '../assets/logo.png';
import { motion } from 'framer-motion';

// Configure API base URL
const API_BASE_URL = 'https://garba-booking-backend.onrender.com';

// Custom styled components
const GradientCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  marginBottom: theme.spacing(3),
}));

const PriceCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  color: 'white',
  marginTop: theme.spacing(2),
}));

const TicketCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  margin: theme.spacing(2, 0),
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  border: '2px dashed #667eea',
  borderRadius: '15px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-10px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    background: 'white',
    borderRadius: '50%',
    border: '2px solid #667eea'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    right: '-10px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    background: 'white',
    borderRadius: '50%',
    border: '2px solid #667eea'
  }
}));

const TicketBooking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ticketType: 'regular',
    quantity: 1,
    eventDate: '2025-10-15'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [errors, setErrors] = useState({});
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const ticketTypes = [
    { value: 'regular', label: 'Regular Pass', price: 499, icon: '🎭' },
    { value: 'vip', label: 'VIP Pass', price: 1099, icon: '👑' },
    { value: 'couple', label: 'Couple Pass', price: 799, icon: '💑' }
  ];


  const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // Load Razorpay script
  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          setRazorpayLoaded(true);
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };
        
        script.onerror = () => {
          setRazorpayLoaded(false);
          resolve(false);
        };
        
        document.body.appendChild(script);
      });
    };

    const initializeApp = async () => {
      await loadRazorpay();
      
      if (!process.env.REACT_APP_RAZORPAY_KEY_ID) {
        console.error('❌ Razorpay API key not configured');
      } else {
        console.log('✅ Razorpay API key configured');
      }
    };

    initializeApp();
  }, []);

  const calculateTicketPrice = (data) => {
    const selectedTicket = ticketTypes.find(t => t.value === data.ticketType);
    return selectedTicket ? selectedTicket.price * data.quantity : 0;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) newErrors.phone = 'Phone number is invalid';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const processPayment = async (orderData) => {
    try {
      if (!window.Razorpay || !razorpayLoaded) {
        return { success: false, error: 'Payment system not loaded. Please refresh the page.' };
      }
      
      const originalAmount = calculateTicketPrice(orderData);
      
      const response = await axios.post(`${API_BASE_URL}/api/create-payment-order`, {
        amount: originalAmount,
        currency: 'INR',
        receipt: `garba_${Date.now()}`
      });

      const { order } = response.data;
      
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'Garba Night 2025',
        description: 'Garba Dance Event Tickets',
        order_id: order.id,
        prefill: {
          name: orderData.name,
          email: orderData.email,
          contact: orderData.phone
        },
        theme: {
          color: '#667eea'
        },
        handler: function (response) {
          handlePaymentSuccess({
            success: true,
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature
          });
        },
        modal: {
          ondismiss: function() {
            setIsLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      return new Promise((resolve) => {
        window.razorpayResolve = resolve;
      });

    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      };
    }
  };

  const handlePaymentSuccess = async (paymentResult) => {
    setPaymentData(paymentResult);
    
    try {
      // Generate individual tickets for each quantity
      const generatedTickets = await generateTickets(formData, paymentResult.paymentId);
      
      if (generatedTickets && generatedTickets.length > 0) {
        setTickets(generatedTickets);
        setBookingComplete(true);
        
        // Send email with all tickets
        try {
          await sendTicketsEmail(generatedTickets);
          toast.success(`🎉 Booking successful! ${generatedTickets.length} tickets generated and sent to email!`);
        } catch (emailError) {
          toast.success(`🎉 Booking successful! ${generatedTickets.length} tickets generated (email sending failed)`);
        }
      } else {
        throw new Error('Ticket generation failed');
      }
      
      if (window.razorpayResolve) {
        window.razorpayResolve(paymentResult);
        delete window.razorpayResolve;
      }
      
    } catch (error) {
      // Fallback: Create individual tickets for each quantity
      const fallbackTickets = [];
      for (let i = 0; i < formData.quantity; i++) {
        const ticketId = `GARBA-${Date.now()}-${String(i + 1).padStart(3, '0')}`;
        fallbackTickets.push({
          ticketId: ticketId,
          attendeeName: formData.name,
          ticketType: formData.ticketType,
          ticketNumber: i + 1,
          totalTickets: formData.quantity,
          paymentId: paymentResult.paymentId,
          eventDate: '2025-10-15',
          eventName: 'Garba Night 2025',
          individualPrice: calculateTicketPrice({...formData, quantity: 1}),
          status: 'Confirmed',
          qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
            JSON.stringify({
              ticketId: ticketId,
              event: 'Garba Night 2025',
              date: '2025-09-27',
              name: formData.name,
              type: formData.ticketType,
              ticketNumber: i + 1
            })
          )}`,
          venue: 'Event Hall, Gujarat',
          time: '6:00 PM - 11:00 PM'
        });
      }
      
      setTickets(fallbackTickets);
      setBookingComplete(true);
      toast.success(`Payment successful! ${fallbackTickets.length} tickets generated with QR codes.`);
      
      if (window.razorpayResolve) {
        window.razorpayResolve(paymentResult);
        delete window.razorpayResolve;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const generateTickets = async (bookingData, paymentId) => {
    try {
      const ticketData = {
        customerName: bookingData.name,
        customerEmail: bookingData.email,
        customerPhone: bookingData.phone,
        ticketType: bookingData.ticketType,
        quantity: parseInt(bookingData.quantity),
        eventDate: bookingData.eventDate,
        paymentId: paymentId,
        totalAmount: calculateTicketPrice(bookingData),
        eventName: 'Garba Night 2025'
      };

      const response = await axios.post(`${API_BASE_URL}/api/generate-tickets`, ticketData, {
        timeout: 10000
      });
      
      if (response.data && response.data.success && response.data.tickets) {
        return response.data.tickets;
      } else {
        throw new Error('Invalid response from ticket generation API');
      }
    } catch (error) {
      throw error;
    }
  };

  const sendTicketsEmail = async (generatedTickets) => {
    try {
      console.log('📧 Sending tickets via email...');
      
      const emailData = {
        to: formData.email,
        customerName: formData.name,
        tickets: generatedTickets,
        eventName: 'Garba Night 2025',
        eventDate: '2025-10-15',
        totalAmount: calculateTicketPrice(formData),
        paymentId: paymentData?.paymentId
      };

      const response = await axios.post(`${API_BASE_URL}/api/send-tickets-email`, emailData, {
        timeout: 15000 // 15 second timeout
      });
      
      if (response.data && response.data.success) {
        console.log('✅ Email sent successfully');
        toast.success('📧 Tickets sent to your email!');
        return true;
      } else {
        throw new Error(response.data?.message || 'Email sending failed');
      }
    } catch (error) {
      console.error('❌ Email sending failed:', error.response?.data || error.message);
      throw new Error('Failed to send tickets via email');
    }
  };

  // Download ticket as PDF
  const downloadTicketAsPDF = async (ticket, index) => {
    try {
      toast.loading('Generating PDF...', { duration: 2000 });

      const element = document.createElement('div');
      element.innerHTML = `
        <div style="
          width: 120mm;
          min-height: 150mm;
          padding: 10mm;
          margin: 0 auto;
          background: white;
          border: 3px dashed #667eea;
          border-radius: 20px;
          font-family: Arial, sans-serif;
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
          position: relative;
        ">
          <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #667eea; padding-bottom: 20px;">
            
          <img src="${logo}" alt="Company Logo" style="width: 60px; height: 60px; margin-right: 20px; object-fit: contain;" />
          <h1 style="color: #667eea; font-size: 36px; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);">
              🎭 Garba Night 2025 🎭
            </h1>
            <p style="color: #666; font-size: 18px; margin: 5px 0 0 0;">Official Entry Ticket</p>
          </div>
          
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin: 30px 0;">
            <div style="flex: 1; padding-right: 30px;">
              <div style="margin-bottom: 15px; display: flex;">
                <span style="font-weight: bold; min-width: 130px; color: #333;">Ticket ID:</span>
                <span style="color: #667eea; font-weight: bold; font-family: monospace;">${ticket.ticketId}</span>
              </div>
              <div style="margin-bottom: 15px; display: flex;">
                <span style="font-weight: bold; min-width: 130px; color: #333;">Name:</span>
                <span style="color: #666;">${ticket.attendeeName}</span>
              </div>
              <div style="margin-bottom: 15px; display: flex;">
                <span style="font-weight: bold; min-width: 130px; color: #333;">Type:</span>
                <span style="color: #667eea; font-weight: bold;">${ticket.ticketType.toUpperCase()} PASS</span>
              </div>
              ${ticket.ticketNumber ? `
              <div style="margin-bottom: 15px; display: flex;">
                <span style="font-weight: bold; min-width: 130px; color: #333;">Ticket Number:</span>
                <span style="color: #666;">${ticket.ticketNumber} of ${ticket.totalTickets}</span>
              </div>
              ` : ''}
              <div style="margin-bottom: 15px; display: flex;">
                <span style="font-weight: bold; min-width: 130px; color: #333;">Date:</span>
                <span style="color: #666;">September 27, 2025</span>
              </div>
              <div style="margin-bottom: 15px; display: flex;">
                <span style="font-weight: bold; min-width: 130px; color: #333;">Time:</span>
                <span style="color: #666;">6:00 PM - 11:00 PM</span>
              </div>
              <div style="margin-bottom: 15px; display: flex;">
                <span style="font-weight: bold; min-width: 130px; color: #333;">Venue:</span>
                <span style="color: #666;">Event Hall, Gujarat</span>
              </div>
              <div style="margin-bottom: 15px; display: flex;">
                <span style="font-weight: bold; min-width: 130px; color: #333;">Status:</span>
                <span style="color: #4CAF50; font-weight: bold;">✅ CONFIRMED</span>
              </div>
            </div>
            
            <div style="text-align: center; flex: 0 0 180px;">
              <img src="${ticket.qrCode}" alt="QR Code" style="width: 150px; height: 150px; border: 3px solid #ffffff; border-radius: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
              <div style="margin-top: 10px; font-size: 12px; color: #000; font-weight: bold;">
                📱 SCAN FOR ENTRY
              </div>
            </div>
          </div>
          
          <div style="background: #fff3cd; border: 2px solid #ffeaa7; padding: 20px; border-radius: 10px; margin: 30px 0;">
            <h3 style="color: #856404; margin: 0 0 15px 0; font-size: 18px;">⚠️ Important Instructions:</h3>
            <ul style="color: #856404; margin: 0; padding-left: 20px; line-height: 1.6;">
              <li>Carry this ticket and a valid photo ID</li>
              <li>Entry gates open at 6:00 PM</li>
              <li>No outside food or beverages allowed</li>
              <li>Show QR code for quick entry</li>
              <li>Contact: info.upasana@orangepetal.in</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #eee; color: #666; font-size: 14px;">
            <p style="margin: 0;">Thank you for joining Garba Night 2025! 🎉</p>
            <p style="margin: 5px 0 0 0;">Generated on ${new Date().toLocaleDateString()} | Payment ID: ${paymentData?.paymentId || 'N/A'}</p>
          </div>
        </div>
      `;

      const opt = {
        margin: 0.5,
        filename: `Garba_Night_2025_Ticket_${ticket.ticketId}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          letterRendering: true
        },
        jsPDF: { 
          unit: 'in', 
          format: 'a4', 
          orientation: 'portrait' 
        }
      };

      await html2pdf().set(opt).from(element).save();
      
      toast.success(`Ticket ${index + 1} PDF downloaded successfully!`);
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('Failed to generate PDF');
    }
  };

  // Download all tickets as PDF
  const downloadAllTicketsAsPDF = async () => {
    try {
      toast.loading(`Generating ${tickets.length} PDF tickets...`, { duration: 3000 });
      
      for (let i = 0; i < tickets.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await downloadTicketAsPDF(tickets[i], i);
      }
      
      toast.success(`All ${tickets.length} PDF tickets downloaded!`);
    } catch (error) {
      toast.error('Failed to download all PDFs');
    }
  };

  const handleBooking = async () => {
    if (!validateForm()) {
      toast.error('Please fix the form errors');
      return;
    }

    if (!razorpayLoaded || !window.Razorpay) {
      toast.error('Payment system not ready. Please refresh the page and try again.');
      return;
    }

    if (!process.env.REACT_APP_RAZORPAY_KEY_ID) {
      toast.error('Payment configuration error. Please contact support.');
      return;
    }

    setIsLoading(true);
    
    try {
      const paymentResult = await processPayment(formData);
      
      if (!paymentResult.success) {
        toast.error(`Payment failed: ${paymentResult.error}`);
        setIsLoading(false);
      }
      
    } catch (error) {
      toast.error('Booking failed. Please try again.');
      setIsLoading(false);
    }
  };

  const handleNewBooking = () => {
    setBookingComplete(false);
    setTickets([]);
    setErrors({});
    setPaymentData(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      ticketType: 'regular',
      quantity: 1,
      eventDate: '2025-10-15'
    });
  };

  // Success Screen with individual tickets display
  if (bookingComplete) {
    return (
      <Container maxWidth="md">
        <Toaster position="top-right" />
        <Box sx={{ mt: 4 ,mb:8}}>
          <Card elevation={4}>
            <CardContent sx={{ textAlign: 'center', p: 4 }}>
              <Avatar sx={{ bgcolor: 'success.main', width: 80, height: 80, mx: 'auto', mb: 2 }}>
                <CheckCircleOutlined sx={{ fontSize: 40 }} />
              </Avatar>
              
              <Typography variant="h4" gutterBottom color="success.main">
                🎉 Booking Successful!
              </Typography>
              
              <Typography variant="body1" color="text.secondary" mb={3}>
                Your {tickets.length} Garba Night ticket{tickets.length > 1 ? 's have' : ' has'} been generated with QR codes.
              </Typography>
              
              <Alert severity="success" sx={{ mb: 3, textAlign: 'left' }}>
                <strong>✅ Payment Confirmed</strong><br/>
                <strong>✅ {tickets.length} Individual Ticket{tickets.length > 1 ? 's' : ''} Generated</strong><br/>
                <strong>✅ QR Codes Ready for Download</strong><br/>
                <strong>✅ Email Sent with All Tickets</strong>
              </Alert>

              {/* Download All Buttons */}
              <Box sx={{ mb: 3 }}>
                <ButtonGroup variant="contained" size="large" sx={{ mb: 2 }}>
                  <Button
                    startIcon={<PictureAsPdfOutlined />}
                    onClick={downloadAllTicketsAsPDF}
                    sx={{
                      background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #c62828 30%, #d32f2f 90%)',
                      }
                    }}
                  >
                    Download All as PDF ({tickets.length})
                  </Button>
                </ButtonGroup>
              </Box>
              
              {/* Individual Ticket Display */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Your Individual Tickets:
                </Typography>
                {tickets.map((ticket, index) => (
                  <TicketCard key={index} elevation={3}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={7}>
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography variant="h6" color="primary" gutterBottom>
                            🎭 Ticket #{ticket.ticketNumber || (index + 1)} {tickets.length > 1 && `of ${tickets.length}`}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Ticket ID:</strong> {ticket.ticketId}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Name:</strong> {ticket.attendeeName}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Type:</strong> {ticket.ticketType.toUpperCase()}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Date:</strong> September 27, 2025
                          </Typography>
                          <Typography variant="body2">
                            <strong>Status:</strong> <Chip size="small" label="Confirmed" color="success" />
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Box sx={{ textAlign: 'center' }}>
                          {ticket.qrCode && (
                            <Box>
                              <img 
                                src={ticket.qrCode} 
                                alt="QR Code" 
                                style={{ width: 100, height: 100, border: '2px solid #ffffff', borderRadius: '8px' }}
                                onError={(e) => {
                                  e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${ticket.ticketId}`;
                                }}
                              />
                              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                                <QrCodeOutlined sx={{ fontSize: 16, mr: 0.5 }} />
                                Entry QR Code
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <Box sx={{ textAlign: 'center' }}>
                          <IconButton 
                            onClick={() => downloadTicketAsPDF(ticket, index)}
                            color="error"
                            title="Download as PDF"
                            sx={{ mb: 1 }}
                          >
                            <PictureAsPdfOutlined />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </TicketCard>
                ))}
              </Box>

              {/* Booking Summary */}
              <Paper elevation={2} sx={{ p: 3, mb: 3, textAlign: 'left' }}>
                <Typography variant="h6" gutterBottom>
                  Booking Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography><strong>Name:</strong></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{formData.name}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><strong>Event:</strong></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>Garba Night 2025</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><strong>Date:</strong></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>September 27, 2025</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><strong>Tickets:</strong></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{tickets.length} x {formData.ticketType}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><strong>Individual Price:</strong></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>₹{ticketTypes.find(t => t.value === formData.ticketType)?.price}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography><strong>Total Paid:</strong></Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" color="primary">
                      ₹{calculateTicketPrice(formData)}
                    </Typography>
                  </Grid>
                  {paymentData?.paymentId && (
                    <>
                      <Grid item xs={6}>
                        <Typography><strong>Payment ID:</strong></Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography sx={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
                          {paymentData.paymentId}
                        </Typography>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Paper>
              
              <Alert severity="info" sx={{ mb: 3, textAlign: 'left' }}>
                <strong>Important Information:</strong><br/>
                • You have received {tickets.length} individual ticket{tickets.length > 1 ? 's' : ''}<br/>
                • Each ticket has a unique QR code for entry<br/>
                • All tickets have been emailed to: {formData.email}<br/>
                • Download and save your tickets before the event<br/>
                • Contact support: info.upasana@orangepetal.in
              </Alert>
              
              <Button 
                variant="outlined" 
                onClick={handleNewBooking}
                size="large"
                startIcon={<ConfirmationNumberOutlined />}
              >
                Book More Tickets
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Container>
    );
  }

  // Main Booking Form (unchanged)
 return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 6 }, position: 'relative' }}>
      <Toaster position="top-right" />

      {/* Animated Background Blobs */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        style={{
          position: 'absolute',
          top: -100,
        right: isMobile ? 15 : -100,
          width: 200,
          height: 200,
          background: 'radial-gradient(circle, #FE6B8B 0%, #FF8E53 100%)',
          borderRadius: '50%',
          opacity: 0.2,
          zIndex: 0,
        }}
      />
      <motion.div
        animate={{ x: [-20, 0, -20], y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        style={{
          position: 'absolute',
          bottom: -80,
          left: -80,
          width: 160,
          height: 160,
          background: 'radial-gradient(circle, #3f51b5 0%, #1a237e 100%)',
          borderRadius: '50%',
          opacity: 0.15,
          zIndex: 0,
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Box sx={{ textAlign: 'center', mb: 4, position: 'relative', zIndex: 1 }}>
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 300 }}
            style={{ display: 'inline-block' }}
          >
            <CelebrationOutlined sx={{ fontSize: { xs: 40, md: 60 }, color: '#FE6B8B' }} />
          </motion.div>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2, mb: 1, fontFamily: '"Sansation", sans-serif', }}>
            Garba Night 2025
          </Typography>
          <Typography variant="subtitle1" sx={{ color: 'text.secondary', fontFamily: '"Sansation", sans-serif', }}>
            Book Your Dance Floor Pass
          </Typography>
          <Chip
            label="September 27, 2025"
            sx={{ mt: 2, bgcolor: 'rgba(254, 107, 139, 0.2)', color: '#FE6B8B', fontFamily: '"Sansation", sans-serif', }}
          />
        </Box>
      </motion.div>

      {/* Booking Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-10px)',
              boxShadow: '0 12px 24px rgba(0,0,0,0.25)',
            },
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h6" sx={{ mb: 6, fontFamily: '"Sansation", sans-serif', }}>
              Booking Details
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  
                   sx={{    width: { xs: '100%', sm: '350px' }, 
    '& .MuiInputBase-root': {
      height: '50px',                    // control input height
      fontSize: '1.1rem',                // font size inside input
    },
 fontFamily: '"Sansation", sans-serif', }}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  InputProps={{
                    startAdornment: <PersonOutlined sx={{ mr: 1, color: 'action.active' }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  sx={{    width: { xs: '100%', sm: '350px' }, 
    '& .MuiInputBase-root': {
      height: '50px',                    // control input height
      fontSize: '1.1rem',                // font size inside input
    },
 fontFamily: '"Sansation", sans-serif', }}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  InputProps={{
                    startAdornment: <EmailOutlined sx={{ mr: 1, color: 'action.active', fontFamily: '"Sansation", sans-serif', }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phone}
                  sx={{    width: { xs: '90%', sm: '350px' }, 
    '& .MuiInputBase-root': {
      height: '50px',                    // control input height
      fontSize: '1.1rem',                // font size inside input
    },
 fontFamily: '"Sansation", sans-serif', }}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  InputProps={{
                    startAdornment: <PhoneOutlined sx={{ mr: 1, color: 'action.active', fontFamily: '"Sansation", sans-serif', }} />,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel  sx={{ fontFamily: '"Sansation", sans-serif', }}>Ticket Type</InputLabel>
                  <Select
                    value={formData.ticketType}
                    label="Ticket Type"
                    onChange={(e) => setFormData({ ...formData, ticketType: e.target.value })}
                      sx={{  width: { xs: '127%', md: '350px' }, 
                      height: '50px',                // set height
          fontFamily: '"Sansation", sans-serif',
          '& .MuiSelect-select': {
            height: '10px',            // set height
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.1rem',        // font size
          }
        }}
                  >
                    {ticketTypes.map((ticket) => (
                      <MenuItem key={ticket.value} value={ticket.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 , fontFamily: '"Sansation", sans-serif',}}>
                          <span>{ticket.icon}</span>
                          <span>{ticket.label} - ₹{ticket.price}</span>
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Quantity"
                  value={formData.quantity}
                   sx={{  width: { xs: '150%', md: '350px' }, 
                      height: '120px',                // set height
          fontFamily: '"Sansation", sans-serif',
          '& .MuiSelect-select': {
            height: '10px',            // set height
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.1rem',        // font size
          },
           '& .MuiFormHelperText-root': {
      fontFamily: '"Sansation", sans-serif',  // Apply your desired font
    },
        
        }}
                  onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                  inputProps={{ min: 1, max: 10 }}
                  helperText={`You will receive ${formData.quantity} ticket${formData.quantity > 1 ? 's' : ''}`}
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 4 }} />

            {/* Total Amount Card */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  color: 'white',
                  textAlign: 'center',
                  p: 3,
                  borderRadius: 2,
                  boxShadow: '0 6px 18px rgba(0,0,0,0.2)',
                  fontFamily: '"Sansation", sans-serif',
                }}
              >
                <Typography variant="h6"  sx={{ fontFamily: '"Sansation", sans-serif', }}>💰 Total Amount</Typography>
                <Typography variant="h3"  sx={{ fontFamily: '"Sansation", sans-serif', }}>₹{calculateTicketPrice(formData)}</Typography>
                <Typography variant="body2"  sx={{ fontFamily: '"Sansation", sans-serif', }}>
                  {formData.quantity} × {ticketTypes.find(t => t.value === formData.ticketType)?.label}
                </Typography>
                <Typography variant="caption" sx={{ mt: 1, display: 'block' ,fontFamily: '"Sansation", sans-serif', }}>
                  You will receive {formData.quantity} ticket{formData.quantity > 1 ? 's' : ''} with unique QR codes
                </Typography>
              </Box>
            </motion.div>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleBooking}
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <PaymentOutlined />}
                  sx={{
                    py: 2,
                    px: 6,
                    fontSize: '1.1rem',
                    fontFamily: '"Sansation", sans-serif',
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    transition: 'background 0.3s',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)',
                    },
                  }}
                >
                  {isLoading ? 'Processing Payment...' : `Book ${formData.quantity} Ticket${formData.quantity > 1 ? 's' : ''} Now`}
                </Button>
              </motion.div>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center', fontFamily: '"Sansation", sans-serif', }}>
              🔒 Secure payment powered by Razorpay
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </Container>
  );
};

export default TicketBooking;
