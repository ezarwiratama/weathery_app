import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { fetchWeather } from "../services/api";
import Navbar from "../components/Navbar";
import WeatherMetrics from "../components/WeatherMetrics";

const UNSPLASH_ACCESS_KEY = "Mp2FxTbeNNnIMRQ0O-uwsWlktSVu6pTE6QTzt-lmZew";

const Forecast = () => {
  const { city } = useParams();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeather(city);
        setWeather(data);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchBackground = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_ACCESS_KEY}&orientation=landscape`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setBackgroundImage(data.results[0].urls.regular);
        } else {
          // fallback default gambar
          setBackgroundImage("https://source.unsplash.com/1600x900/?city");
        }
      } catch (error) {
        console.error("Failed to fetch background image:", error);
        setBackgroundImage("https://source.unsplash.com/1600x900/?city");
      }
    };

    getWeather();
    fetchBackground();
  }, [city]);

  if (loading) {
    return (
      <>
        <Navbar />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="70vh"
        >
          <CircularProgress />
        </Box>
      </>
    );
  }

  if (!weather) {
    return (
      <>
        <Navbar />
        <Container sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h5">No weather data available.</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      
      {/* Section Background */}
      <Box
        sx={{
          minHeight: "40vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textShadow: "1px 1px 4px rgba(0,0,0,0.7)",
          p: 3,
        }}
      >
        <Typography variant="h3" component="h1" sx={{ fontWeight: "bold", mb: 2 }}>
          {weather.name}, {weather.sys.country}
        </Typography>
        <Typography variant="h6">
          Check the weather conditions for today
        </Typography>
      </Box>

      <Container sx={{ mt: 5 }}>
        <WeatherMetrics weather={weather} />
      </Container>
    
    </>
  );
};

export default Forecast;
