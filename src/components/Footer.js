import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: '#D9D9D9',
    padding: '16px',
    textAlign: 'center',
    borderTop: '1px solid #e0e0e0', 
    marginTop: 'auto',
    alignContent: 'center',
    height: '60px',
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer component="footer">
      <Typography variant="body2" color="text.primary">
        Copyright © {currentYear} Weathery
      </Typography>
    </FooterContainer>
  );
};

export default Footer;