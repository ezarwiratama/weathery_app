import React, { useState, useEffect, useCallback } from "react";
import { Box, IconButton } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import satu from "../assets/1.png";
import dua from "../assets/2.png";
import tiga from "../assets/3.png";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const autoplayInterval = 5000;

  const images = [satu, dua, tiga];

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    let interval;

    if (autoplay) {
      interval = setInterval(nextImage, autoplayInterval);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoplay, nextImage]);

  const handleManualNavigation = useCallback((callback) => {
    setAutoplay(false);
    callback();
    setTimeout(() => {
      setAutoplay(true);
    }, 5000);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        p: 2,
        mb: 2,
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "800px",
          height: "450px",
          overflow: "hidden",
          borderRadius: "8px",
        }}
      >
        <img
          src={images[currentIndex]}
          alt={`carousel-${currentIndex}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease-in-out",
          }}
        />

        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onClick={() => handleManualNavigation(prevImage)}
        >
          <ArrowBack sx={{ color: "white" }} />
        </IconButton>

        <IconButton
          sx={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onClick={() => handleManualNavigation(nextImage)}
        >
          <ArrowForward sx={{ color: "white" }} />
        </IconButton>

        {/* Indikator gambar saat ini */}
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "8px",
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor:
                  index === currentIndex ? "white" : "rgba(255, 255, 255, 0.5)",
                cursor: "pointer",
              }}
              onClick={() => {
                setCurrentIndex(index);
                handleManualNavigation(() => {});
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Carousel;
