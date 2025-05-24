import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";

const CurrentWeather = ({ weather }) => {
  function toTitleCase(text) {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  const weatherCondition = toTitleCase(weather.weather[0].description);
  const temperature = Math.round(weather.main.temp);
  const realFeel = Math.round(weather.main.feels_like);
  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Current Weather
      </Typography>

      <Card
        sx={{
          maxWidth: 320,
          margin: "0 auto",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Box
            component="img"
            src={iconUrl}
            alt="Weather Icon"
            sx={{ width: 100, height: 100 }}
          />
          <Box textAlign="left">
            <Typography variant="body1" fontWeight="bold">
              {weatherCondition}
            </Typography>
            <Typography variant="h3" fontWeight="bold">
              {temperature}
              <Typography
                component="span"
                variant="h6"
                sx={{ fontWeight: "bold" }}
              >
                °C
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              RealFeel {realFeel}°C
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CurrentWeather;
