import React, { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';
import satu from "../assets/1.png";
import dua from "../assets/2.png";
import tiga from "../assets/3.png";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    satu,
    dua,
    tiga
  ];

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh', // Vertikal center
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '800px',
          height: '450px',
          overflow: 'hidden',
          borderRadius: '8px',
        }}
      >
        <img
          src={images[currentIndex]}
          alt={`carousel-${currentIndex}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease-in-out',
          }}
        />

        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={prevImage}
        >
          <ArrowBack sx={{ color: 'white' }} />
        </IconButton>

        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={nextImage}
        >
          <ArrowForward sx={{ color: 'white' }} />
        </IconButton>
      </Box>
    </Box>
  )
};

export default Carousel;
