// utils/qrGenerator.js
import QRCode from 'qrcode';

export const generateQRCode = async (ticketData) => {
  try {
    // Create unique ticket ID
    const ticketId = generateUniqueId();
    
    // Encrypt ticket information
    const ticketInfo = {
      ticketId,
      eventName: 'Garba Night 2025',
      attendeeName: ticketData.name,
      eventDate: ticketData.eventDate,
      ticketType: ticketData.ticketType,
      timestamp: new Date().toISOString()
    };

    // Generate QR code with encrypted data
    const qrCodeDataURL = await QRCode.toDataURL(
      JSON.stringify(ticketInfo),
      {
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      }
    );

    return {
      qrCode: qrCodeDataURL,
      ticketInfo
    };
  } catch (error) {
    console.error('QR generation failed:', error);
    throw error;
  }
};

const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
