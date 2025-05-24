import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid
} from '@mui/material';

function toTitleCase(text) {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Fungsi untuk format tanggal
function formatDate(dt_txt) {
  const date = new Date(dt_txt);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

const UpcomingWeather = ({ weather }) => {
  if (!weather || !weather.list) return null;

  const dailyForecast = weather.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 6);

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Upcoming Weather
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        {dailyForecast.map((item, index) => (
          <Grid item xs={6} sm={4} md={2} key={index}>
            <Card sx={{ boxShadow: 2, borderRadius: 2 }}>
              <CardContent>
                <Typography variant="body1" fontWeight="bold" gutterBottom>
                  {formatDate(item.dt_txt)}
                </Typography>
                <Box
                  component="img"
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                  alt="Weather icon"
                  sx={{ width: 64, height: 64, margin: '0 auto' }}
                />
                <Typography variant="h4" fontWeight="bold">
                  {Math.round(item.main.temp)}
                  <Typography component="span" variant="h6" sx={{ fontWeight: 'bold' }}>°C</Typography>
                </Typography>
                <Typography variant="body2">
                  {toTitleCase(item.weather[0].description)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UpcomingWeather;
