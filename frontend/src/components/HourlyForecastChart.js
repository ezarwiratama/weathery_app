import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box
} from "@mui/material";
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const HourlyForecastChart = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  const hourlyData = forecast.list.slice(0, 9);

  const labels = hourlyData.map(item =>
    new Date(item.dt_txt).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true
    })
  );

  const temperatures = hourlyData.map(item => item.main.temp);
  const rainVolumes = hourlyData.map(item => item.rain?.["3h"] || 0);
  const descriptions = hourlyData.map(item => item.weather[0].description);
  const windSpeeds = hourlyData.map(item => item.wind.speed);
  const pops = hourlyData.map(item => item.pop * 100); // convert to percentage

  const data = {
    labels,
    datasets: [
      {
        type: "bar",
        label: "Rain (mm)",
        data: rainVolumes,
        backgroundColor: "rgba(135,206,250,0.6)",
        yAxisID: "y1",
      },
      {
        type: "line",
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "tomato",
        borderWidth: 2,
        tension: 0.3,
        yAxisID: "y",
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          afterBody: function(context) {
            const index = context[0].dataIndex;
            return [
              `Condition: ${descriptions[index]}`,
              `Wind: ${windSpeeds[index]} m/s`,
              `Pop: ${pops[index]}%`
            ];
          }
        }
      },
      legend: {
        position: "top"
      },
    },
    scales: {
      y: {
        type: "linear",
        position: "left",
        ticks: {
          callback: function (value) {
            return value + "°";
          }
        },
        title: {
          display: true,
          text: "Temperature (°C)"
        }
      },
      y1: {
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false
        },
        title: {
          display: true,
          text: "Rain (mm)"
        }
      }
    }
  };

  return (
    <Card sx={{ mt: 4, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", p: 2 }}>
          Hourly Forecast
        </Typography>
        <Box sx={{ height: '80vh', width: '100%', justifyItems: 'center', mb: '4vh'}}>
          <Chart type="bar" data={data} options={options}/>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HourlyForecastChart;
