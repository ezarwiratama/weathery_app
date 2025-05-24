import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Link,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { loginUser } from '../services/api';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password.');
      setOpenErrorSnackbar(true);
      return;
    }

    try {
      const res = await loginUser({ username, password });
      localStorage.setItem('token', res.token);
      localStorage.setItem('username', username);
      setError('');
      setOpenSnackbar(true);
    } catch (err) {
      setError(err.message || 'Login failed');
      setOpenErrorSnackbar(true);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
    navigate('/');
  };

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />

      <Box component="main" flex={1} display="flex" justifyContent="center" alignItems="center">
        <Container maxWidth="md">
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            Login
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" mb={4}>
            Enter your credentials to access your account
          </Typography>
          <Box component="form" onSubmit={handleSubmit} onKeyPress={handleKeyPress}>
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
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  placeholder="Enter your password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Box mt={3} textAlign="center">
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link component="button" variant="body2" onClick={() => navigate('/register')} sx={{ cursor: 'pointer' }}>
                  Register
                </Link>
              </Typography>
            </Box>

            <Box mt={4} display="flex" justifyContent="center">
              <Button type="submit" variant="contained" sx={{ backgroundColor: 'black', color: 'white', width: '13.3vw' }}>
                Login
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      <Footer />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Login berhasil!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseErrorSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;