import React, { useState } from "react";
import { Box, Typography, IconButton, keyframes } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/system";

// Animasi untuk efek heartbeat
const heartbeat = keyframes`
  0% { transform: scale(1); }
  25% { transform: scale(1.1); }
  40% { transform: scale(1); }
  60% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#D9D9D9",
  padding: "16px",
  textAlign: "center",
  borderTop: "1px solid #e0e0e0",
  marginTop: "auto",
  alignContent: "center",
  height: "60px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [liked, setLiked] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
    }
    setLiked(!liked);
  };

  return (
    <FooterContainer component="footer">
      <Typography variant="body2" color="text.primary">
        Copyright © {currentYear} Weathery | Made with
        <IconButton
          aria-label="love"
          onClick={handleLike}
          color={liked ? "error" : "default"}
          size="small"
          sx={{
            mx: 0.5,
            animation: animate ? `${heartbeat} 0.8s ease` : "none",
            "&:hover": {
              transform: "scale(1.2)",
              transition: "transform 0.2s ease",
            },
          }}
        >
          <FavoriteIcon fontSize="small" />
        </IconButton>
        by Kelompok 9 RPL A
      </Typography>
      {liked && (
        <Typography variant="caption" color="text.secondary">
          Terima kasih atas dukungannya!
        </Typography>
      )}
    </FooterContainer>
  );
};

export default Footer;