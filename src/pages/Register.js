import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  InputAdornment,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { registerUser } from "../services/api";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setOpenErrorSnackbar(true);
      return;
    }

    try {
      const res = await registerUser({
        username: form.username,
        email: form.email,
        password: form.password,
      });
      setSuccess(res.message);
      setOpenSuccessSnackbar(true);
      setForm({ username: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message || "Registration failed");
      setOpenErrorSnackbar(true);
    }
  };

  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSuccessSnackbar(false);
    navigate("/login");
  };

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="calc(100vh - 160px)"
        py={8}
      >
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            fontWeight="bold"
            gutterBottom
          >
            Register
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="textSecondary"
            mb={4}
          >
            Create Your Account
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            onKeyPress={handleKeyPress}
          >
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
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Box mt={4} display="flex" justifyContent="center">
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: "black", color: "white" }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer />

      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSuccessSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSuccessSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {success}
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseErrorSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseErrorSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Register;
