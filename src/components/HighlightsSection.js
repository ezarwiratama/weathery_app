import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import PublicIcon from '@mui/icons-material/Public'; // globe icon
import FlashOnIcon from '@mui/icons-material/FlashOn';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';

const features = [
  {
    title: "Accurate Weather in 200,000+ Cities",
    description: "Weathery brings real-time weather updates from cities all around the globe",
    icon: <PublicIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Real-Time Weather Data",
    description: "View current temperature, humidity, wind speed, and sky conditions. all in real time, right at your fingertips.",
    icon: <CloudQueueIcon sx={{ fontSize: 40 }} />,
  },
  {
    title: "Fast, Lightweight & Responsive",
    description: "Built with React JS for a smooth and fast experience on any device.",
    icon: <FlashOnIcon sx={{ fontSize: 40 }} />,
  },
];

const HighlightsSection = () => {
  return (
    <Box sx={{ py: 6, px: 3, backgroundColor: "#fff", textAlign: "center" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        Weathery Highlights
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={1}
              sx={{ height: "100%", borderRadius: 2, px: 2, py: 3 }}
            >
              <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                {feature.icon}
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HighlightsSection;
