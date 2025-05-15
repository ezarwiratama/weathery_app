import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }
        setError('');
        alert('Logged in!');
    };

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Navbar />

            {/* Main content area */}
            <Box
                component="main"
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Container maxWidth="md">
                    <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                        Login
                    </Typography>
                    <Typography variant="body1" align="center" color="textSecondary" mb={4}>
                        Enter your credentials to access your account
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={4} justifyContent="center">
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    variant="outlined"
                                    placeholder="Enter your username"
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    variant="outlined"
                                    placeholder="Enter your password"
                                />
                            </Grid>
                        </Grid>

                        {error && (
                            <Typography color="error" align="center" mt={2}>
                                {error}
                            </Typography>
                        )}

                        {/* Text "Don't have an account? Register" */}
                        <Box mt={3} textAlign="center">
                            <Typography variant="body2">
                                Don’t have an account?{' '}
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => navigate('/register')}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    Register
                                </Link>
                            </Typography>
                        </Box>

                        <Box mt={4} display="flex" justifyContent="center" gap={2} flexWrap="wrap">
                            <Button variant="outlined" color="inherit">
                                Forgot Password
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ backgroundColor: 'black', color: 'white', width: '13.3vw' }}
                            >
                                Login
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>

            <Footer />
        </Box>
    );
};

export default Login;
