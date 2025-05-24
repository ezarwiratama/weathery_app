import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Container, 
  Typography, 
  CircularProgress, 
  Box, 
  Tooltip,
  Snackbar,
  Alert 
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { fetchWeather, fetchForecast, addFavoriteCity, removeFavoriteCity, checkFavoriteCity } from "../services/api";
import Navbar from "../components/Navbar";
import WeatherMetrics from "../components/WeatherMetrics";
import CurrentWeather from "../components/CurrentWeather";
import UpcomingWeather from "../components/UpcomingWeather";
import HourlyForecastChart from "../components/HourlyForecastChart";
import Footer from "../components/Footer";

const UNSPLASH_ACCESS_KEY = "Mp2FxTbeNNnIMRQ0O-uwsWlktSVu6pTE6QTzt-lmZew";

const Forecast = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const token = localStorage.getItem("token"); 

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await fetchWeather(city);
        const forecast = await fetchForecast(city);
        setWeather(data);
        setForecastData(forecast);  
      } catch (error) {
        showSnackbar(error.message, "error");
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
          setBackgroundImage("https://images.unsplash.com/photo-1579003593419-98f949b9398f?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
        }
      } catch (error) {
        console.error("Failed to fetch background image:", error);
        setBackgroundImage("https://images.unsplash.com/photo-1579003593419-98f949b9398f?q=80&w=1473&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
      }
    };

    const checkFavorite = async () => {
      if (token) {
        try {
          const result = await checkFavoriteCity(city, token);
          setIsFavorite(result.isFavorite);
        } catch (error) {
          console.error("Failed to check favorite status:", error);
        }
      }
    };

    getWeather();
    fetchBackground();
    checkFavorite();
  }, [city, token]);

  const showSnackbar = (message, severity = "success") => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFavoriteCity(city, token);
        showSnackbar(`${city} removed from your favorites!`);
      } else {
        await addFavoriteCity(city, token);
        showSnackbar(`${city} added to your favorites!`);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      showSnackbar(err.message || "Failed to update favorites", "error");
    }
  };

  // Function to handle going back
  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Function to download weather data as CSV
  const handleDownloadCSV = () => {
    if (!weather || !forecastData) return;
    
    // Format current weather data
    const currentWeatherData = {
      city: weather.name,
      country: weather.sys.country,
      date: new Date().toISOString(),
      temperature: weather.main.temp,
      feels_like: weather.main.feels_like,
      humidity: weather.main.humidity,
      pressure: weather.main.pressure,
      wind_speed: weather.wind.speed,
      description: weather.weather[0].description,
      icon: weather.weather[0].icon,
    };
    
    // Format forecast data (next 5 days)
    const forecastRows = forecastData.list.map(item => ({
      city: weather.name,
      country: weather.sys.country,
      date: item.dt_txt,
      temperature: item.main.temp,
      feels_like: item.main.feels_like,
      humidity: item.main.humidity,
      pressure: item.main.pressure,
      wind_speed: item.wind.speed,
      description: item.weather[0].description,
      icon: item.weather[0].icon
    }));
    
    // Combine current weather with forecast
    const allData = [currentWeatherData, ...forecastRows];
    
    // Create CSV headers
    const headers = Object.keys(allData[0]).join(',');
    
    // Create CSV content
    const csvContent = allData.map(row => 
      Object.values(row).map(value => 
        // Handle values with commas by wrapping in quotes
        typeof value === 'string' && value.includes(',') 
          ? `"${value}"` 
          : value
      ).join(',')
    );
    
    // Combine headers and content
    const csv = [headers, ...csvContent].join('\n');
    
    // Create blob and download link
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${weather.name}_weather_data.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

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
          p: 3,
        }}
      >
        <Box
          onClick={handleBack}
          sx={{
            position: 'absolute',
            top: '80px',
            left: '40px',
            backgroundColor: 'rgb(255 255 255)',
            padding: '5px 10px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            color: 'black',
            cursor: 'pointer',
            transition: '0.3s',
            '&:hover': {
              backgroundColor: 'black',
              color: 'white',
            },
          }}
        >
          <ArrowBackIcon />
          <Typography sx={{fontSize: '14px',}}>Back</Typography>
        </Box>

        {/* Favorite & Download buttons */}
        <Box
          sx={{
            position: 'absolute',
            top: '80px',
            right: '40px',
            display: 'flex',
            gap: '10px',
          }}
        >
          {/* Download Excel */}
         <Tooltip title="Download .csv" arrow>
            <Box
              onClick={handleDownloadCSV}
              sx={{
                backgroundColor: 'white',
                padding: '5px 10px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                color: 'black',
                cursor: 'pointer',
                transition: '0.3s',
                '&:hover': {
                  backgroundColor: 'black',
                  color: 'white',
                },
              }}
            >
              <InsertDriveFileIcon />
            </Box>
          </Tooltip>

          {/* Favorite Button */}
          <Box
            onClick={handleToggleFavorite}
            sx={{
              backgroundColor: isFavorite ? '#4caf50' : 'white',
              padding: '5px 10px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              color: isFavorite ? 'white' : 'black',
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: isFavorite ? '#357a38' : 'black',
                color: 'white',
              },
            }}
          >
            {isFavorite ? <CheckCircleIcon /> : <StarBorderIcon />}
            <Typography sx={{fontSize: '14px',}}>
              {isFavorite ? 'Favorited' : 'Set as Favorite'}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: "bold", mb: 2, textShadow: "1px 1px 5px rgba(0,0,0,0.7)", }}
        >
          {weather.name}, {weather.sys.country}
        </Typography>
        <Typography variant="h6" sx={{ textShadow: "1px 1px 5px rgba(0,0,0,0.7)", }}>
          Check the weather conditions for today
        </Typography>
      </Box>

      <Container sx={{ mt: 5, mb: 5 }}>
        <CurrentWeather weather={weather} />
        <UpcomingWeather weather={forecastData} />
        <WeatherMetrics weather={weather} />
        <HourlyForecastChart forecast={forecastData} />
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Forecast;