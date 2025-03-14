import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, AppBar, Toolbar, Box } from "@mui/material";
import logo from "../assets/weathery-logo-no-bg.png"; // Import logo
import background from "../assets/sky.jpg"; // Import background image

const Home = () => {
    const [city, setCity] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (city.trim()) {
            navigate(`/dashboard/${city}`);
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Header */}
            <AppBar position="static" sx={{ backgroundColor: "#ffffff", boxShadow: 2 }}>
                <Toolbar sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img src={logo} alt="Weathery Logo" style={{ height: 40 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "#1976d2" }}>
                        Weathery
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Konten Utama (Tengah Layar) */}
            <Box
                sx={{
                    height: "80vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Typography variant="h4" gutterBottom sx={{ color: "white", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
                    Masukkan Nama Kota, dan Cari Tahu Cuacanya!
                </Typography>
                <Box sx={{ display: "flex", gap: 2, backgroundColor: "rgba(255,255,255,0.8)", padding: 2, borderRadius: 2 }}>
                    <TextField
                        label="Masukkan Kota"
                        variant="outlined"
                        size="small"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        sx={{ backgroundColor: "white", borderRadius: 1 }}
                    />
                    <Button variant="contained" onClick={handleSearch}>
                        Cari
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
