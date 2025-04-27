import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, AppBar, Toolbar, Box } from "@mui/material";
import logo from "../assets/weathery-logo-no-bg.png";
import background from "../assets/bg.jpg";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import HighlightsSection from "../components/HighlightsSection";

// LOGIN PAKE CLERK

const Home = () => {
    const [city, setCity] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (city.trim()) {
            navigate(`/dashboard/${city}`);
        }
    };

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
        color:'black',
      }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
      }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        border: '1px solid black',
        borderRadius: '12px',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
          '&::placeholder': {
            color: 'black', // Ganti dengan warna yang kamu inginkan
            opacity: 1, // Pastikan opacity 1 agar warnanya terlihat
        },
        },
      }));



    return (
        <Box
            sx={{
                minHeight: "100vh",
                // backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Header */}
            <AppBar position="static" sx={{ backgroundColor: "#ffffff", boxShadow: 2 }}>
                <Toolbar sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <img src={logo} alt="Weathery Logo" style={{ height: 40 }} />
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "#1976d2" }}>
                        Weathery App
                    </Typography>
                    <Button color="inherit" sx={{ color: "black"}} onClick={() => navigate("/")}>Home</Button>
                    <Button color="inherit" sx={{ color: "black"}} onClick={() => navigate("/forecast")}>Forecast</Button>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search in site"
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Button color="inherit" sx={{ color: "black"}} onClick={() => navigate("/")}>Login</Button>
                    <Button
                        variant="contained"
                        onClick={() => navigate("/register")}
                        sx={{
                            backgroundColor: "#000",
                            color: "#fff",
                            '&:hover': {
                            backgroundColor: "#333",
                            },
                            ml: 1,
                        }}
                        >
                        Register
                    </Button>
                </Toolbar>
            </AppBar>

            <Box
            sx={{
                minHeight: "60vh",
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
            <HighlightsSection />
        </Box>
    );
};

export default Home;
