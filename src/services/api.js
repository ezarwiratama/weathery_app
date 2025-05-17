import axios from 'axios';

const WEATHER_API_KEY = "958dc09de91b935b6f25d17fec6b4f8b";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";
const BACKEND_BASE_URL = "http://localhost:5000/api"; // Ganti kalau deploy

// ==================== WEATHER APIs ====================
export const fetchWeather = async (city) => {
  try {
    const res = await axios.get(`${WEATHER_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric'
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const fetchForecast = async (city) => {
  try {
    const res = await axios.get(`${WEATHER_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric'
      }
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
};

// ==================== AUTH APIs ====================
export const registerUser = async ({ username, email, password }) => {
  try {
    const res = await axios.post(`${BACKEND_BASE_URL}/auth/register`, {
      username,
      email,
      password
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    const res = await axios.post(`${BACKEND_BASE_URL}/auth/login`, {
      username,
      password
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};
