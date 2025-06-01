import axios from "axios";

const WEATHER_API_KEY = "958dc09de91b935b6f25d17fec6b4f8b";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";
const BACKEND_BASE_URL = "https://weatheryapp-production.up.railway.app";

// ==================== WEATHER APIs ====================
export const fetchWeather = async (city) => {
  try {
    const res = await axios.get(`${WEATHER_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: "metric",
      },
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
        units: "metric",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
};

// Fetch weather for 10 famous global cities
export const fetchGlobalWeather = async () => {
  const cities = [
    "New York",
    "London",
    "Tokyo",
    "Paris",
    "Sydney",
    "Dubai",
    "Singapore",
    "Istanbul",
    "Moscow",
    "Rio de Janeiro",
  ];

  try {
    const responses = await Promise.all(
      cities.map((city) =>
        axios.get(`${WEATHER_BASE_URL}/weather`, {
          params: {
            q: city,
            appid: WEATHER_API_KEY,
            units: "metric",
          },
        })
      )
    );

    return responses.map((res) => {
      return {
        city: res.data.name,
        temp: Math.round(res.data.main.temp),
        description: res.data.weather[0].description,
        iconCode: res.data.weather[0].icon,
      };
    });
  } catch (error) {
    console.error("Error fetching global weather data:", error);
    throw error;
  }
};

export const fetchWeatherByCoords = async (lat, lon) => {
  try {
    const res = await axios.get(`${WEATHER_BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: WEATHER_API_KEY,
        units: "metric",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching weather by coordinates:", error);
    throw error;
  }
};

// ==================== AUTH APIs ====================
export const registerUser = async ({ username, email, password }) => {
  try {
    const res = await axios.post(`${BACKEND_BASE_URL}/api/auth/register`, {
      username,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    const res = await axios.post(`${BACKEND_BASE_URL}/api/auth/login`, {
      username,
      password,
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// ==================== FAVORITE CITIES APIs ====================
export const addFavoriteCity = async (city, token) => {
  try {
    const res = await axios.post(
      `${BACKEND_BASE_URL}/api/user/favorite`,
      { city },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to add favorite city" };
  }
};

export const fetchFavoriteCities = async (token) => {
  try {
    const res = await axios.get(`${BACKEND_BASE_URL}/api/user/favorite`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch favorites" };
  }
};

// Check if a city is in user's favorites
export const checkFavoriteCity = async (city, token) => {
  try {
    const res = await axios.get(
      `${BACKEND_BASE_URL}/api/user/favorite/check/${city}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    return { isFavorite: false };
  }
};

// Remove a city from user's favorites
export const removeFavoriteCity = async (city, token) => {
  try {
    const res = await axios.delete(
      `${BACKEND_BASE_URL}/api/user/favorite/${city}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to remove favorite city" };
  }
};

export const fetchWeatherByCity = async (city) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      city
    )}&units=metric&appid=${WEATHER_API_KEY}`
  );
  if (!response.ok) throw new Error("Failed to fetch weather");
  return response.json();
};

// In api.js - update these functions

export const getProfile = async (token) => {
  try {
    const res = await axios.get(`${BACKEND_BASE_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch profile" };
  }
};

export const updateProfile = async (data, token) => {
  try {
    const res = await axios.put(`${BACKEND_BASE_URL}/api/auth/profile`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update profile" };
  }
};
