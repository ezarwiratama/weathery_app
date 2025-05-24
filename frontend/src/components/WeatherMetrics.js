import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import {
  Thermostat as TemperatureIcon,
  Air as WindIcon,
  Cloud as CloudIcon,
  Opacity as HumidityIcon,
  WbSunny as SunriseIcon,
  WbTwilight as SunsetIcon,
  Compress as CompressIcon,
} from "@mui/icons-material";

const WeatherMetrics = ({ weather }) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Box sx={{ mt: 6, textAlign: "center" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Weather Metrics
      </Typography>
      <Grid container spacing={3} justifyContent="center">

        {/* Temperature */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", borderRadius: 2, height: '20vh' }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
              Temperature
            </Typography>
            <TemperatureIcon sx={{ fontSize: 40 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {Math.round(weather.main.temp)}°C
            </Typography>
            <Typography variant="body2" sx={{ fontSize: "12px" }}>
              Feels like: {Math.round(weather.main.feels_like)}°C
            </Typography>
          </Paper>
        </Grid>

        {/* Humidity */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", borderRadius: 2, height: '20vh' }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
              Humidity
            </Typography>
            <HumidityIcon sx={{ fontSize: 40,}} />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {weather.main.humidity}%
            </Typography>
          </Paper>
        </Grid>

        {/* Wind speed */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", borderRadius: 2, height: '20vh' }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
              Wind Speed
            </Typography>
            <WindIcon sx={{ fontSize: 40,}} />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {weather.wind.speed} m/s
            </Typography>
          </Paper>
        </Grid>

        {/* Pressure */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", borderRadius: 2, height: '20vh' }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
              Pressure
            </Typography>
            <CompressIcon sx={{ fontSize: 40,}} />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {weather.main.pressure} hPa
            </Typography>
          </Paper>
        </Grid>

        {/* Cloudiness */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", borderRadius: 2, height: '20vh' }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
              Cloudiness
            </Typography>
            <CloudIcon sx={{ fontSize: 40,}} />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {weather.clouds.all}%
            </Typography>
          </Paper>
        </Grid>

        {/* Sunrise & Sunset */}
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 3, textAlign: "center", borderRadius: 2, height: '20vh' }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "bold" }}>
              Sunrise & Sunset
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
              <Box sx={{ textAlign: "center" }}>
                <SunriseIcon sx={{ fontSize: 40 }} />
                <Typography variant="h6" sx={{ fontSize:"17px" , fontWeight: "bold"}}>
                  {formatTime(weather.sys.sunrise)}
                </Typography>
                <Typography variant="body2" sx={{ fontSize:"12px"}}>Sunrise</Typography>
              </Box>
              <Box sx={{ textAlign: "center" }}>
                <SunsetIcon sx={{ fontSize: 40 }} />
                <Typography variant="h6" sx={{ fontSize:"17px", fontWeight: "bold"}}>
                  {formatTime(weather.sys.sunset)}
                </Typography>
                <Typography variant="body2" sx={{ fontSize:"12px"}}>Sunset</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WeatherMetrics;