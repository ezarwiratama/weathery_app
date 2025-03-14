import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const WeatherCard = ({ data }) => {
    if (!data) return null;

    return (
        <Card sx={{ maxWidth: 400, textAlign: "center", m: 2, p: 2 }}>
            <CardContent>
                <Typography variant="h5">{data.name}, {data.sys.country}</Typography>
                <WbSunnyIcon sx={{ fontSize: 50, color: "gold" }} />
                <Typography variant="h4">{Math.round(data.main.temp)}°C</Typography>
                <Typography variant="subtitle1">{data.weather[0].description}</Typography>
                <Typography variant="body2">Humidity: {data.main.humidity}% | Wind: {data.wind.speed} m/s</Typography>
            </CardContent>
        </Card>
    );
};

export default WeatherCard;
