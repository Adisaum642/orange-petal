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

const API_BASE_URL = 'https://garba-booking-backend.onrender.com';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [scanStats, setScanStats] = useState(null);
  const [manualEntryOpen, setManualEntryOpen] = useState(false);
  const [manualTicketId, setManualTicketId] = useState('');
  const [showScannerUI, setShowScannerUI] = useState(false);

  const scannerRef = useRef(null);
  const html5QrcodeScannerRef = useRef(null);
  const scanInProgress = useRef(false);

  useEffect(() => {
    loadScanStats();
    return () => {
      cleanupScanner();
    };
  }, []);

  useEffect(() => {
    if (showScannerUI) {
      initializeScanner();
    }
  }, [showScannerUI]);

  const loadScanStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/scan-stats`);
      setScanStats(response.data.stats);
    } catch (error) {
      console.error('Error loading stats:', error);
      setScanStats({
        totalTickets: 0,
        scannedTickets: 0,
        pendingTickets: 0,
        scanRate: 0
      });
    }
  };

  const cleanupScanner = () => {
    if (html5QrcodeScannerRef.current) {
      try {
        html5QrcodeScannerRef.current.clear();
        html5QrcodeScannerRef.current = null;
        console.log('✅ Scanner cleaned up');
      } catch (error) {
        console.error('❌ Cleanup error:', error);
      }
    }
  };

  const initializeScanner = () => {
    if (!scannerRef.current) {
      console.error('❌ Scanner container not ready');
      toast.error('Scanner container not ready');
      return;
    }

    setIsInitializing(true);
    cleanupScanner();

    html5QrcodeScannerRef.current = new Html5QrcodeScanner(
      scannerRef.current.id,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        showTorchButtonIfSupported: true,
        showZoomSliderIfSupported: true,
        defaultZoomValueIfSupported: 2,
        disableFlip: false,
        rememberLastUsedCamera: true
      },
      false
    );

    html5QrcodeScannerRef.current.render(onScanSuccess, onScanFailure);
    setIsScanning(true);
    setIsInitializing(false);
    scanInProgress.current = false;
    console.log('✅ Scanner initialized');
  };

  const startScanning = () => {
    setShowScannerUI(true);
    setScanResult(null)
  };

  const stopScanning = () => {
    cleanupScanner();
    setIsScanning(false);
    setShowScannerUI(false);
    toast.success('Scanner stopped');
  };

  const onScanSuccess = async (decodedText) => {
    if (scanInProgress.current) return;
    scanInProgress.current = true;

    console.log('📱 QR scanned:', decodedText);
    stopScanning();
    await validateQRCode(decodedText);
  };

  const onScanFailure = (error) => {
    if (!error.includes('QR code parse error') && !error.includes('No QR code found')) {
      console.log('Scan error:', error);
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
      toast.error('Enter ticket ID');
      return;
    }
    try {
      const loadingToast = toast.loading('Processing manual entry...');
      await axios.post(`${API_BASE_URL}/api/manual-entry`, {
        ticketId: manualTicketId.trim(),
        reason: 'Manual entry override',
        authorizedBy: 'Gate Supervisor'
      });
      toast.dismiss(loadingToast);
      toast.success('Manual entry granted!');
      setManualEntryOpen(false);
      setManualTicketId('');
      await loadScanStats();
    } catch (error) {
      toast.dismiss();
      console.error('Manual entry error:', error);
      toast.error('Error processing manual entry');
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

  return (
    <Container maxWidth="lg">
      <Toaster position="top-center" />
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 6, mb: 6 }}>
          🎭 Garba Night 2025 - Entry Scanner
        </Typography>

        {scanStats && (
          <Grid container spacing={2} sx={{ mb: 4 }} justifyContent={"center"}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'primary.main', color: 'white' }}>
                <Typography variant="h4">{scanStats.totalTickets}</Typography>
                <Typography>Total Tickets</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'success.main', color: 'white' }}>
                <Typography variant="h4">{scanStats.scannedTickets}</Typography>
                <Typography>Entries Granted</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'warning.main', color: 'white' }}>
                <Typography variant="h4">{scanStats.pendingTickets}</Typography>
                <Typography>Pending</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 3, textAlign: 'center', bgcolor: 'info.main', color: 'white' }}>
                <Typography variant="h4">{scanStats.scanRate}%</Typography>
                <Typography>Success Rate</Typography>
              </Paper>
            </Grid>
          </Grid>
        )}

        <Grid container spacing={6} justifyContent={"center"}>
          <Grid item xs={12} md={8}>
            <ScannerCard elevation={4}>
              <CardContent>
                <Typography variant="h5" gutterBottom>📱 QR Scanner</Typography>
                <Box sx={{ minHeight: '400px', minWidth: '350px', position: 'relative' }}>
                  {!showScannerUI ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <QrCodeScanner sx={{ fontSize: 120, color: 'primary.main', mb: 3 }} />
                      <Typography variant="h6">Ready to Scan</Typography>
                      <Button variant="contained" startIcon={<CameraAlt />} onClick={startScanning}>
                        Start Camera Scanner
                      </Button>
                    </Box>
                  ) : isInitializing ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <CircularProgress size={60} sx={{ mb: 3 }} />
                      <Typography>Initializing Camera...</Typography>
                    </Box>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 3 }}>
                      <Typography color="success.main">Scanner Active</Typography>
                      <Button variant="outlined" startIcon={<Stop />} onClick={stopScanning} color="error" sx={{ mt: 2 }}>
                        Stop Scanner
                      </Button>
                      <Box id="qr-reader" ref={scannerRef} style={{ width: '100%', maxWidth: '500px', margin: '20px auto' }} />
                    </Box>
                  )}
                </Box>
              </CardContent>
            </ScannerCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={4}>
              <CardContent>
                <Typography variant="h6" gutterBottom>📊 Scan Result</Typography>
                {!scanResult ? (
                  <Box sx={{ textAlign: 'center', py: 6 }}>
                    <QrCodeScanner sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography>Waiting for scan...</Typography>
                  </Box>
                ) :  (
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
                <Box sx={{ mt: 3 }}>
                  <Button fullWidth variant="outlined" startIcon={<Refresh />} onClick={() => setScanResult(null)} disabled={isScanning || isInitializing}>
                    Clear Result
                  </Button>
                  <Button fullWidth variant="text" startIcon={<PersonAdd />} onClick={() => setManualEntryOpen(true)} disabled={isScanning || isInitializing}>
                    Manual Entry
                  </Button>
                  {!isScanning && !isInitializing && (
                    <Button fullWidth variant="contained" startIcon={<CameraAlt />} onClick={startScanning}>
                      Scan Next Ticket
                    </Button>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={manualEntryOpen} onClose={() => setManualEntryOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <VpnKey color="primary" /> Manual Entry Override
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 3 }}>Enter the ticket ID manually for emergency entry.</Typography>
          <TextField
            fullWidth
            label="Ticket ID"
            value={manualTicketId}
            onChange={(e) => setManualTicketId(e.target.value.toUpperCase())}
            placeholder="GARBA-XXXXXXXXX-XXX"
            autoFocus
            onKeyPress={(e) => {
              if (e.key === "Enter" && manualTicketId.trim()) handleManualEntry();
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setManualEntryOpen(false)}>Cancel</Button>
          <Button onClick={handleManualEntry} variant="contained" disabled={!manualTicketId.trim()}>
            Grant Entry
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default QRScanner;
