import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box, Paper, Grid } from "@mui/material";
import background from "../assets/bg2.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchGlobalWeather, fetchWeatherByCoords, fetchFavoriteCities, fetchWeatherByCity } from "../services/api";

const MainForecast = () => {
  const [city, setCity] = useState("");
  const [globalWeather, setGlobalWeather] = useState([]);
  const [currentLocationWeather, setCurrentLocationWeather] = useState(null);
  const [favoriteWeather, setFavoriteWeather] = useState([]);
  const navigate = useNavigate();

  function toTitleCase(text) {
    return text
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const handleSearch = () => {
    if (city.trim()) {
      navigate(`/forecast/${city}`);
    }
  };

  const handleCardClick = (cityName) => {
    navigate(`/forecast/${cityName}`);
  };

  useEffect(() => {
    const loadGlobalWeather = async () => {
      try {
        const data = await fetchGlobalWeather();
        setGlobalWeather(data);
      } catch (error) {
        console.error("Failed to load global weather:", error);
      }
    };

    loadGlobalWeather();
  }, []);

  useEffect(() => {
    const loadCurrentLocationWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const data = await fetchWeatherByCoords(
                position.coords.latitude,
                position.coords.longitude
              );
              setCurrentLocationWeather({
                city: data.name,
                temp: Math.round(data.main.temp),
                iconCode: data.weather[0].icon,
              });
            } catch (error) {
              console.error("Failed to fetch current location weather:", error);
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      }
    };
    loadCurrentLocationWeather();
  }, []);

  useEffect(() => {
    const loadFavoriteWeather = async () => {
      try {
        const token = localStorage.getItem('token'); // pastikan token ada
        if (!token) return;

        // Fetch daftar kota favorit dari backend
        const data = await fetchFavoriteCities(token);

        // Untuk setiap kota, fetch data cuaca dari OpenWeatherMap
        const weatherPromises = data.favoriteCities.map(async (city) => {
          const weather = await fetchWeatherByCity(city);
          return {
            city: toTitleCase(city),
            temp: Math.round(weather.main.temp),
            iconCode: weather.weather[0].icon,
            description: weather.weather[0].description,
          };
        });

        const weatherData = await Promise.all(weatherPromises);

        setFavoriteWeather(weatherData);
      } catch (error) {
        console.error("Failed to load favorite weather:", error);
      }
    };

    loadFavoriteWeather();
  }, []);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />

      <Box
        sx={{
          minHeight: "90vh",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: "bold", color: "white", mt: "9vh", mb: 1 }}
        >
          Today's Weather
        </Typography>
        <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
          Check out the current weather conditions
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            padding: 2,
            borderRadius: 2,
          }}
        >
          <TextField
            placeholder="Enter Location..."
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            sx={{
              backgroundColor: "white",
              borderRadius: 2,
              width: { xs: "100%", sm: "500px" },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              backgroundColor: "black",
              color: "white",
              borderRadius: 2,
              px: 4,
              justifySelf: "center",
              width: "300px",
              mt: 1,
              "&:hover": {
                backgroundColor: "#333",
              },
            }}
          >
            Search
          </Button>
        </Box>

        {/* Current & Favourite Cards - side by side */}
        <Box
          sx={{
            mt: 4,
            mb: 3,
            width: "100%",
            maxWidth: "1200px", // Added maximum width to prevent extending too far
            mx: "auto",
            px: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* Current Locations */}
            <Box sx={{ flex: "0 0 auto", width: { xs: "100%", md: "20%" } }}>
              <Typography
                variant="h6"
                color="white"
                align="left"
                fontWeight="bold"
                mb={1}
              >
                Current Locations
              </Typography>
              {currentLocationWeather ? (
                <Paper
                  elevation={2}
                  onClick={() => handleCardClick(currentLocationWeather.city)}
                  sx={{
                    width: 100,
                    height: 140,
                    p: 2,
                    textAlign: "center",
                    borderRadius: 2,
                    backgroundColor: "white",
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover": {
                      boxShadow: 4,
                      transform: "scale(1.02)",
                      transition: "all 0.2s ease-in-out",
                    },
                  }}
                >
                  <Typography fontWeight="bold">
                    {currentLocationWeather.city}
                  </Typography>
                  <img
                    src={`https://openweathermap.org/img/wn/${currentLocationWeather.iconCode}@2x.png`}
                    alt="weather icon"
                    style={{ width: 50, height: 50 }}
                  />
                  <Typography fontWeight="bold" fontSize={'25px'}>
                    {currentLocationWeather.temp}°C
                  </Typography>
                </Paper>
              ) : (
                <Typography color="white">Detecting location...</Typography>
              )}
            </Box>

            {/* Favourites */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                color="white"
                align="left"
                fontWeight="bold"
                mb={1}
              >
                Favorite
              </Typography>
              {/* Fix for the favorite cities container */}
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap", // This allows items to wrap to the next line
                  gap: 2,
                  maxWidth: "100%", // Ensures container doesn't exceed its parent
                  overflowX: "auto", // Allows horizontal scrolling if needed
                  pb: 1,
                  "&::-webkit-scrollbar": { height: 8 },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#ccc",
                    borderRadius: 4,
                  },
                  // Grid layout for better responsiveness
                  ...(favoriteWeather.length === 1 && {
                    display: "block", // For single city, use block instead of flex
                    maxWidth: "140px", // Limit width for single city
                  })
                }}
              >
                {favoriteWeather.length === 0 ? (
                  <Typography color="white" sx={{ px: 2 }}>
                    No favorite cities found.
                  </Typography>
                ) : (
                  favoriteWeather.map(({ city, temp, iconCode, description }) => (
                    <Paper
                      key={city}
                      elevation={2}
                      onClick={() => handleCardClick(city)}
                      sx={{
                        width: 100,
                        height: 140,
                        p: 2,
                        textAlign: "center",
                        borderRadius: 2,
                        backgroundColor: "white",
                        flexShrink: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:hover": {
                          boxShadow: 4,
                          transform: "scale(1.02)",
                          transition: "all 0.2s ease-in-out",
                        },
                      }}
                    >
                      <Typography fontWeight="bold">{city}</Typography>
                      <img
                        src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                        alt={description}
                        style={{ width: 50, height: 50 }}
                      />
                      <Typography fontWeight="bold" fontSize={"25px"}>
                        {temp}°C
                      </Typography>
                    </Paper>
                  ))
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ py: 6, px: { xs: 2, md: 10 }, bgcolor: "#fff" }}>
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Global Weather Conditions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            {globalWeather.slice(0, 5).map((item, index) => (
              <Paper
                key={index}
                onClick={() => handleCardClick(item.city)}
                sx={{
                  p: 2,
                  mb: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: 4,
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <Typography>{item.city}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography>{item.description}</Typography>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.iconCode}@2x.png`}
                    alt="weather icon"
                    style={{ width: 50, height: 50 }}
                  />
                  <Typography>{item.temp}°C</Typography>
                </Box>
              </Paper>
            ))}
          </Grid>

          <Grid item xs={12} sm={6}>
            {globalWeather.slice(5).map((item, index) => (
              <Paper
                key={index}
                onClick={() => handleCardClick(item.city)}
                sx={{
                  p: 2,
                  mb: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": {
                    boxShadow: 4,
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <Typography>{item.city}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Typography>{item.description}</Typography>
                  <img
                    src={`https://openweathermap.org/img/wn/${item.iconCode}@2x.png`}
                    alt="weather icon"
                    style={{ width: 50, height: 50 }}
                  />
                  <Typography>{item.temp}°C</Typography>
                </Box>
              </Paper>
            ))}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default MainForecast;