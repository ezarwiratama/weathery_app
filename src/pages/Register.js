import React, { useState } from 'react';
import {
    Container,
    TextField,
    Button,
    Typography,
    Grid,
    Box
} from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setSuccess('Registration successful!');
        setForm({
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        });
    };

    return (
        <>
            <Navbar />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="calc(100vh - 160px)" // 100vh dikurangi tinggi navbar+footer
                py={8} // padding vertical
            >
                <Container maxWidth="sm">
                    <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                        Register
                    </Typography>
                    <Typography variant="body1" align="center" color="textSecondary" mb={4}>
                        Create Your Account
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Username"
                                    name="username"
                                    value={form.username}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type="password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    variant="outlined"
                                    required
                                />
                            </Grid>
                        </Grid>

                        {error && (
                            <Typography color="error" align="center" mt={2}>
                                {error}
                            </Typography>
                        )}
                        {success && (
                            <Typography color="success.main" align="center" mt={2}>
                                {success}
                            </Typography>
                        )}

                        <Box mt={4} display="flex" justifyContent="center">
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ backgroundColor: 'black', color: 'white' }}
                            >
                                Register
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </Box>
            <Footer />
        </>
    );
};

export default Register;
