import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import logo from "../assets/weathery-logo-no-bg.png";
import ProfileDropdown from './ProfileDropdown';

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
    color: 'black',
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
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
        '&::placeholder': {
            color: 'black',
            opacity: 1,
        },
    },
}));

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const username = localStorage.getItem('username');
    const isLoggedIn = !!username;

    const showSearchBar = location.pathname.includes('/forecast');

    return (
        <AppBar position="static" sx={{ backgroundColor: "#ffffff", boxShadow: 2 }}>
            <Toolbar sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <img src={logo} alt="Weathery Logo" style={{ height: 40 }} />
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color: "#1976d2" }}>
                    Weathery App
                </Typography>
                <Button color="inherit" sx={{ color: "black" }} onClick={() => navigate("/")}>Home</Button>
                <Button color="inherit" sx={{ color: "black" }} onClick={() => navigate("/forecast/jakarta")}>Forecast</Button>

                {showSearchBar && (
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search City"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                )}

                {isLoggedIn ? (
                    <ProfileDropdown username={username} />
                ) : (
                    <>
                        <Button color="inherit" sx={{ color: "black" }} onClick={() => navigate("/login")}>Login</Button>
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
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
