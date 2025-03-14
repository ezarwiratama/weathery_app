import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, CircularProgress } from "@mui/material";
import { fetchWeather } from "../services/api";
import WeatherCard from "../components/WeatherCard";

const Dashboard = () => {
    const { city } = useParams();
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchWeather(city);
                setWeather(data);
            } catch (error) {
                alert(error.message);
            }
        };

        getWeather();
    }, [city]);

    return (
        <Container sx={{ textAlign: "center", mt: 5 }}>
            <Typography variant="h4">Weather in {city}</Typography>
            <WeatherCard data={weather} />
        </Container>
    );
};

export default Dashboard;
