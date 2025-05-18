const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const authMiddleware = require('../middleware/authMiddleware');

// Tambah kota favorite user
router.post('/favorite', authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { city } = req.body;
  if (!city) return res.status(400).json({ message: "City is required" });
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.favoriteCities.includes(city)) {
      user.favoriteCities.push(city);
      await user.save();
    }
    res.json({ message: `${city} added to favorites`, favoriteCities: user.favoriteCities });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Ambil daftar favorite cities user
router.get('/favorite', authMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ favoriteCities: user.favoriteCities });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Hapus kota dari favorite user
router.delete('/favorite/:city', authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { city } = req.params;
  
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    // Filter out the city to be removed
    user.favoriteCities = user.favoriteCities.filter(
      favCity => favCity !== city
    );
    
    await user.save();
    res.json({ 
      message: `${city} removed from favorites`, 
      favoriteCities: user.favoriteCities 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Check if a city is in user's favorites
router.get('/favorite/check/:city', authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { city } = req.params;
  
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    const isFavorite = user.favoriteCities.includes(city);
    res.json({ isFavorite });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;