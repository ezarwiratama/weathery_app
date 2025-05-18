import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";
import background from "../assets/bg.jpg";
import Navbar from "../components/Navbar";
import HighlightsSection from "../components/HighlightsSection";
import Carousel from "../components/Carousel"
import Footer from "../components/Footer";

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

            {/* first Content */}
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

            {/* Overlay */}
            {/* <Box
                sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1,
                }}
            /> */}

            <Typography
                variant="h3"
                component="h1"
                sx={{ fontWeight: "bold", color: "white", mb: 1 }}
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
