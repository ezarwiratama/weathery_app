const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Weathery backend is up and running!');
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));