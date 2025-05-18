import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Avatar,
  Grid,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { grey } from "@mui/material/colors";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProfile, updateProfile } from "../services/api"; 

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [editableFields, setEditableFields] = useState({
    username: false,
    email: false,
    password: false,
  });
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const data = await getProfile(token);
      setProfileData({
        username: data.username || "",
        email: data.email || "",
        password: data.password || "",
      });
    } catch (err) {
      console.error("Gagal mengambil data profil:", err.message);
      setSnackbarMessage("Gagal mengambil data profil");
      setOpenErrorSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await updateProfile(profileData, token);
      setSnackbarMessage("Profil berhasil diperbarui!");
      setOpenSuccessSnackbar(true);
      setEditableFields({
        username: false,
        email: false,
        password: false,
      });
      fetchUserData();
    } catch (err) {
      console.error("Gagal memperbarui profil:", err.message);
      setSnackbarMessage("Gagal memperbarui profil!");
      setOpenErrorSnackbar(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  const handleCancel = () => {
    fetchUserData();
    setEditableFields({
      username: false,
      email: false,
      password: false,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const enableEditField = (fieldName) => {
    setEditableFields((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Container component="main" sx={{ flexGrow: 1, py: 2 }}>
        <Paper elevation={0} sx={{ p: 0 }}>
          {/* Header */}
          <Box sx={{ bgcolor: grey[200], p: 2 }}>
            <Button
              startIcon={<ArrowBackIcon />}
              sx={{ color: "black", textTransform: "none" }}
              onClick={() => window.history.back()}
            >
              Back
            </Button>
          </Box>

          {/* Avatar */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              bgcolor: grey[300],
              py: 3,
            }}
          >
            <Avatar sx={{ width: 80, height: 80, mb: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              {profileData.username || "User"}
            </Typography>
          </Box>

          {/* Form */}
          {!loading && (
            <Box
              component="form"
              onSubmit={handleSubmit}
              onKeyPress={handleKeyPress}
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <Grid container spacing={2} alignItems="center">
                {/* Username */}
                <Grid item xs={12}>
                  <Typography variant="body1" fontWeight="bold" mb={1}>
                    Username
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                 <TextField
                    fullWidth
                    name="username"
                    value={profileData.username}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Enter username"
                    disabled={!editableFields.username}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    sx={{ border: 1, borderColor: "gray" }}
                    onClick={() => enableEditField("username")}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>

                {/* Email */}
                <Grid item xs={12}>
                  <Typography variant="body1" fontWeight="bold" mb={1}>
                    Email
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    name="email"
                    type="email"
                    value={profileData.email}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="Enter email"
                    disabled={!editableFields.email}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    sx={{ border: 1, borderColor: "gray" }}
                    onClick={() => enableEditField("email")}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>

                {/* Password */}
                <Grid item xs={12}>
                  <Typography variant="body1" fontWeight="bold" mb={1}>
                    Password
                  </Typography>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    fullWidth
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={profileData.password}
                    onChange={handleChange}
                    placeholder="Enter new password (leave blank to keep current)"
                    disabled={!editableFields.password}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleTogglePassword} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    sx={{ border: 1, borderColor: "gray" }}
                    onClick={() => enableEditField("password")}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
              </Grid>

              {/* Action buttons */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                  mt: 4,
                }}
              >
                <Button variant="outlined" onClick={handleCancel} sx={{ px: 10 }}>
                  Batal
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    px: 10,
                    bgcolor: "black",
                    "&:hover": { bgcolor: "black" },
                  }}
                >
                  Simpan
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
      <Footer />

      {/* Success Snackbar */}
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;