import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import background from "../assets/bg.jpg";

import Navbar from "../components/Navbar";
import HighlightsSection from "../components/HighlightsSection";
import Carousel from "../components/Carousel"
import Footer from "../components/Footer";

// LOGIN PAKE CLERK

const Home = () => {
    const [city, setCity] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (city.trim()) {
            navigate(`/forecast/${city}`);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Navbar */}
            <Navbar />

            {/* Content */}
            <Box
            sx={{
                minHeight: "60vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                px: 2,
            }}
            >
            <Typography
                variant="h3"
                component="h1"
                sx={{ fontWeight: "bold", color: "white", mb: 1 }}
            >
                Today's Weather
            </Typography>
            <Typography variant="h6" sx={{ color: "white", mb: 3 }}>
                Check out the current weather conditions
            </Typography>

            <Box
                sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
                backgroundColor: "rgba(255,255,255,0.9)",
                padding: 2,
                borderRadius: 2,
                }}
            >
                <TextField
                placeholder="Enter Location..."
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                sx={{ backgroundColor: "white", borderRadius: 1, width: { xs: "100%", sm: "300px" } }}
                />
                <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                    backgroundColor: "black",
                    color: "white",
                    borderRadius: "8px",
                    px: 4,
                    '&:hover': {
                    backgroundColor: "#333",
                    },
                }}
                >
                Search
                </Button>
            </Box>
            </Box>
            
            {/* higlight section */}
            <HighlightsSection />

            {/* carousel section */}
            <Carousel/>

            {/* footer */}
            <Footer />
        </Box>
    );
};

export default Home;
