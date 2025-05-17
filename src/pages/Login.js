import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Grid, Box, Link, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loginUser } from '../services/api';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            const res = await loginUser({ username, password });

            // Simpan data login ke localStorage
            localStorage.setItem('token', res.token);
            localStorage.setItem('username', username); // Simpan username

            setError('');
            setOpenSnackbar(true);
        } catch (err) {
            setError(err.message || 'Login failed');
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
        navigate('/');
    };

    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Navbar />

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

                        <Box mt={4} display="flex" justifyContent="center">
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

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Login berhasil!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Login;
