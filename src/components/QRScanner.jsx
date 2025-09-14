import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Grid,
  Paper,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress
} from '@mui/material';
import {
  QrCodeScanner,
  CheckCircle,
  Cancel,
  Warning,
  Refresh,
  CameraAlt,
  Stop,
  PersonAdd,
  VpnKey
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const ScannerCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  minHeight: '400px'
}));

const API_BASE_URL = 'http://localhost:5001';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [scanStats, setScanStats] = useState(null);
  const [manualEntryOpen, setManualEntryOpen] = useState(false);
  const [manualTicketId, setManualTicketId] = useState('');
  const [showScannerUI, setShowScannerUI] = useState(false); // Add this state

  // Use refs for better control
  const html5QrcodeScannerRef = useRef(null);
  const qrReaderElementRef = useRef(null);
  const scannerInitialized = useRef(false);

  // Initialize component
  useEffect(() => {
    loadScanStats();
    
    // Cleanup function
    return () => {
      cleanupScanner();
    };
  }, []);

  const loadScanStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/scan-stats`);
      setScanStats(response.data.stats);
    } catch (error) {
      console.error('Error loading stats:', error);
      // Mock data for testing
      setScanStats({
        totalTickets: 0,
        scannedTickets: 0,
        pendingTickets: 0,
        scanRate: 0
      });
    }
  };

  const cleanupScanner = () => {
    if (html5QrcodeScannerRef.current && scannerInitialized.current) {
      try {
        html5QrcodeScannerRef.current.clear();
        scannerInitialized.current = false;
        console.log('✅ Scanner cleaned up successfully');
      } catch (error) {
        console.error('❌ Error cleaning up scanner:', error);
      }
    }
  };

  const startScanning = async () => {
    if (isInitializing || isScanning) return;

    setIsInitializing(true);
    setShowScannerUI(true); // Show the scanner UI first
    console.log('🔄 Initializing QR Scanner...');

    try {
      // Wait longer to ensure DOM is rendered and ready
      await new Promise(resolve => setTimeout(resolve, 500));

      // Check if element exists multiple times
      let element = null;
      let attempts = 0;
      const maxAttempts = 10;

      while (!element && attempts < maxAttempts) {
        element = document.getElementById("qr-reader");
        if (!element) {
          console.log(`Attempt ${attempts + 1}: QR reader element not found, waiting...`);
          await new Promise(resolve => setTimeout(resolve, 200));
          attempts++;
        }
      }

      if (!element) {
        throw new Error('QR reader element not found in DOM after multiple attempts');
      }

      console.log('✅ QR reader element found, initializing scanner...');

      // Clean up any existing scanner
      cleanupScanner();

      // Initialize scanner with better configuration
      html5QrcodeScannerRef.current = new Html5QrcodeScanner(
        "qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true,
          defaultZoomValueIfSupported: 2,
          disableFlip: false,
          rememberLastUsedCamera: true,
          supportedScanTypes: [0, 1] // QR Code and Data Matrix
        },
        false // verbose logging disabled
      );

      // Render scanner
      html5QrcodeScannerRef.current.render(
        onScanSuccess,
        onScanFailure
      );

      scannerInitialized.current = true;
      setIsScanning(true);
      setScanResult(null);
      console.log('✅ QR Scanner initialized successfully');

    } catch (error) {
      console.error('❌ Scanner initialization failed:', error);
      toast.error(`Scanner Error: ${error.message}`);
      setShowScannerUI(false); // Hide scanner UI on error
    } finally {
      setIsInitializing(false);
    }
  };

  const stopScanning = async () => {
    if (!isScanning && !isInitializing) return;

    console.log('🛑 Stopping QR Scanner...');
    
    try {
      cleanupScanner();
      setIsScanning(false);
      setShowScannerUI(false); // Hide scanner UI
      toast.success('Scanner stopped');
    } catch (error) {
      console.error('❌ Error stopping scanner:', error);
      setIsScanning(false);
      setShowScannerUI(false);
    }
  };

  const onScanSuccess = async (decodedText, decodedResult) => {
    console.log('📱 QR Code scanned successfully:', decodedText);
    debugQRCode(decodedText);
    // Stop scanning immediately
    await stopScanning();
    
    // Validate the QR code
    await validateQRCode(decodedText);
  };

  const onScanFailure = (error) => {
    // Only log meaningful errors, ignore scan attempts
    if (!error.includes('QR code parse error') && !error.includes('No QR code found')) {
      console.log('Scan attempt:', error);
    }
  };

const validateQRCode = async (qrData) => {
  try {
    console.log('📱 Raw QR Data received:', qrData);
    console.log('📱 Data type:', typeof qrData);
    console.log('📱 Data length:', qrData.length);
    
    const loadingToast = toast.loading('🔍 Validating ticket...', { duration: 3000 });

    const response = await axios.post(`${API_BASE_URL}/api/validate-qr`, {
      qrData: qrData,
      scannedBy: 'Scanner Terminal 1'
    }, {
      timeout: 10000
    });

    toast.dismiss(loadingToast);
    setScanResult(response.data);
    await loadScanStats(); // Refresh stats
    
    if (response.data.status === 'ENTRY_GRANTED') {
      toast.success(`✅ Entry Granted! Welcome ${response.data.ticket.attendeeName}!`, {
        duration: 5000
      });
    }
    
  } catch (error) {
    console.error('❌ QR Validation failed:', error);
    
    const errorData = error.response?.data || {
      success: false,
      message: 'Server connection failed',
      status: 'CONNECTION_ERROR'
    };
    
    // Log debug information if available
    if (errorData.debug) {
      console.log('🔍 Debug info:', errorData.debug);
    }
    
    setScanResult(errorData);
    
    // Show appropriate error messages
    switch (errorData.status) {
      case 'INVALID_FORMAT':
        toast.error('❌ This QR code is not a valid ticket! Please use only event tickets.', { 
          duration: 7000 
        });
        break;
      case 'ALREADY_SCANNED':
        toast.error('🚫 This ticket has already been used!', { duration: 5000 });
        break;
      case 'TICKET_NOT_FOUND':
        toast.error('❌ Invalid or fake ticket!', { duration: 5000 });
        break;
      case 'CONNECTION_ERROR':
        toast.error('🔌 Server connection failed!', { duration: 5000 });
        break;
      default:
        toast.error(`❌ ${errorData.message}`, { duration: 5000 });
    }
  }
};


  const handleManualEntry = async () => {
    if (!manualTicketId.trim()) {
      toast.error('Please enter a ticket ID');
      return;
    }

    try {
      const loadingToast = toast.loading('Processing manual entry...', { duration: 3000 });
      
      await axios.post(`${API_BASE_URL}/api/manual-entry`, {
        ticketId: manualTicketId.trim(),
        reason: 'Manual entry override',
        authorizedBy: 'Gate Supervisor'
      });
      
      toast.dismiss(loadingToast);
      toast.success('✅ Manual entry granted!');
      setManualEntryOpen(false);
      setManualTicketId('');
      await loadScanStats();
      
    } catch (error) {
      console.error('Manual entry error:', error);
      toast.error(`❌ Manual entry failed: ${error.response?.data?.message || error.message}`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ENTRY_GRANTED': return 'success';
      case 'ALREADY_SCANNED': return 'warning';
      case 'INVALID_QR':
      case 'TICKET_NOT_FOUND':
      case 'CONNECTION_ERROR': return 'error';
      default: return 'info';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'ENTRY_GRANTED': return <CheckCircle />;
      case 'ALREADY_SCANNED': return <Warning />;
      case 'INVALID_QR':
      case 'TICKET_NOT_FOUND':
      case 'CONNECTION_ERROR': return <Cancel />;
      default: return <QrCodeScanner />;
    }
  };


  const debugQRCode = (qrData) => {
  console.log('=== QR CODE DEBUG INFO ===');
  console.log('Raw data:', qrData);
  console.log('Data type:', typeof qrData);
  console.log('Data length:', qrData.length);
  console.log('First 100 chars:', qrData.substring(0, 100));
  console.log('Last 100 chars:', qrData.substring(qrData.length - 100));
  console.log('Contains GARBA-:', qrData.includes('GARBA-'));
  console.log('Starts with {:', qrData.startsWith('{'));
  console.log('Ends with }:', qrData.endsWith('}'));
  console.log('Contains "ticketId":', qrData.includes('ticketId'));
  console.log('=========================');
  
  // Try to parse as JSON
  try {
    const parsed = JSON.parse(qrData);
    console.log('✅ JSON parsing successful:', parsed);
  } catch (e) {
    console.log('❌ JSON parsing failed:', e.message);
    
    // Try URL decoding
    try {
      const decoded = decodeURIComponent(qrData);
      console.log('🔄 URL decoded:', decoded);
      const decodedParsed = JSON.parse(decoded);
      console.log('✅ URL decoded JSON parsing successful:', decodedParsed);
    } catch (e2) {
      console.log('❌ URL decoded JSON parsing also failed:', e2.message);
    }
  }
};

  return (
    <Container maxWidth="lg">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#333',
            color: '#fff',
            fontSize: '16px',
          },
        }}
      />
      
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          🎭 Garba Night 2025 - Entry Scanner
        </Typography>

        {/* Statistics Dashboard */}
        {scanStats && (
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h4" fontWeight="bold">{scanStats.totalTickets}</Typography>
                <Typography variant="body1">Total Tickets</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
                <Typography variant="h4" fontWeight="bold">{scanStats.scannedTickets}</Typography>
                <Typography variant="body1">Entries Granted</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: 'warning.main', color: 'white' }}>
                <Typography variant="h4" fontWeight="bold">{scanStats.pendingTickets}</Typography>
                <Typography variant="body1">Pending</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: 'info.main', color: 'white' }}>
                <Typography variant="h4" fontWeight="bold">{scanStats.scanRate}%</Typography>
                <Typography variant="body1">Success Rate</Typography>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* Main Scanner Interface */}
        <Grid container spacing={4}>
          {/* Scanner Section */}
          <Grid item xs={12} md={8}>
            <ScannerCard elevation={4}>
              <CardContent>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                  📱 QR Code Scanner
                </Typography>
                
                {/* Always render the QR reader div, but control visibility */}
                <Box sx={{ minHeight: '400px' }}>
                  {!showScannerUI && !isInitializing ? (
                    // Scanner Start Screen
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <QrCodeScanner sx={{ fontSize: 120, color: 'primary.main', mb: 3 }} />
                      <Typography variant="h6" gutterBottom>
                        Ready to Scan Tickets
                      </Typography>
                      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Click the button below to activate your camera and start scanning
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<CameraAlt />}
                        onClick={startScanning}
                        sx={{ 
                          py: 2, 
                          px: 6,
                          fontSize: '1.2rem',
                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          boxShadow: '0 4px 8px rgba(33, 150, 243, 0.3)'
                        }}
                      >
                        Start Camera Scanner
                      </Button>
                    </Box>
                  ) : isInitializing ? (
                    // Initializing Screen
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <CircularProgress size={60} sx={{ mb: 3 }} />
                      <Typography variant="h6" gutterBottom>
                        Initializing Camera...
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Please allow camera permission when prompted
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={stopScanning}
                        color="error"
                        sx={{ mt: 2 }}
                      >
                        Cancel
                      </Button>
                    </Box>
                  ) : null}

                  {/* QR Reader Container - Always present when showScannerUI is true */}
                  {showScannerUI && (
                    <Box>
                      <Box sx={{ textAlign: 'center', mb: 3 }}>
                        <Typography variant="h6" gutterBottom color="success.main">
                          📷 Scanner Active
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                          Point your camera at the QR code on the ticket
                        </Typography>
                        <Button
                          variant="outlined"
                          startIcon={<Stop />}
                          onClick={stopScanning}
                          color="error"
                          size="large"
                        >
                          Stop Scanner
                        </Button>
                      </Box>
                      
                      {/* QR Reader Element - Key Fix: Always present when needed */}
                      <Box 
                        sx={{ 
                          width: '100%', 
                          minHeight: '300px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          mt: 3
                        }}
                      >
                        <div 
                          id="qr-reader" 
                          ref={qrReaderElementRef}
                          style={{ 
                            width: '100%',
                            maxWidth: '500px'
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </ScannerCard>
          </Grid>

          {/* Results Section */}
          <Grid item xs={12} md={4}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  📊 Scan Result
                </Typography>

                {!scanResult ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <QrCodeScanner sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="body2" color="text.secondary">
                      Waiting for QR code scan...
                    </Typography>
                  </Box>
                ) : (
                  <Box>
                    <Alert 
                      severity={getStatusColor(scanResult.status)}
                      icon={getStatusIcon(scanResult.status)}
                      sx={{ mb: 3 }}
                    >
                      <Typography variant="body1" fontWeight="bold">
                        {scanResult.message}
                      </Typography>
                    </Alert>

                    {scanResult.ticket && (
                      <Paper elevation={2} sx={{ p: 3, mt: 2, bgcolor: 'grey.50' }}>
                        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                          Ticket Details
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                          <Typography variant="body2">
                            <strong>ID:</strong> {scanResult.ticket.ticketId}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Name:</strong> {scanResult.ticket.attendeeName}
                          </Typography>
                          <Typography variant="body2">
                            <strong>Type:</strong> {scanResult.ticket.ticketType?.toUpperCase()} PASS
                          </Typography>
                          {scanResult.ticket.scannedAt && (
                            <Typography variant="body2">
                              <strong>Entry Time:</strong><br />
                              {new Date(scanResult.ticket.scannedAt).toLocaleString()}
                            </Typography>
                          )}
                        </Box>
                      </Paper>
                    )}

                    {scanResult.status === 'ALREADY_SCANNED' && scanResult.scannedDetails && (
                      <Alert severity="warning" sx={{ mt: 2 }}>
                        <Typography variant="caption" display="block">
                          <strong>Originally Scanned:</strong><br />
                          {new Date(scanResult.scannedDetails.originalScanTime).toLocaleString()}
                        </Typography>
                        <Typography variant="caption" display="block">
                          <strong>By:</strong> {scanResult.scannedDetails.originalScanner}
                        </Typography>
                      </Alert>
                    )}
                  </Box>
                )}

                {/* Action Buttons */}
                <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={() => setScanResult(null)}
                    disabled={isScanning || isInitializing}
                  >
                    Clear Result
                  </Button>
                  
                  <Button
                    fullWidth
                    variant="text"
                    startIcon={<PersonAdd />}
                    onClick={() => setManualEntryOpen(true)}
                    color="secondary"
                    disabled={isScanning || isInitializing}
                  >
                    Manual Entry
                  </Button>

                  {!isScanning && !isInitializing && (
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<CameraAlt />}
                      onClick={startScanning}
                      size="large"
                    >
                      Scan Next Ticket
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Manual Entry Dialog */}
      <Dialog open={manualEntryOpen} onClose={() => setManualEntryOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <VpnKey color="primary" />
            Manual Entry Override
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Enter the ticket ID manually for emergency entry authorization.
          </Typography>
          <TextField
            fullWidth
            label="Ticket ID"
            value={manualTicketId}
            onChange={(e) => setManualTicketId(e.target.value.toUpperCase())}
            placeholder="GARBA-XXXXXXXXX-XXX"
            sx={{ mt: 1 }}
            autoFocus
            onKeyPress={(e) => {
              if (e.key === 'Enter' && manualTicketId.trim()) {
                handleManualEntry();
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setManualEntryOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleManualEntry} 
            variant="contained"
            disabled={!manualTicketId.trim()}
          >
            Grant Entry
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QRScanner;
