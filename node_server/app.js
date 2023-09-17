// app.js
const express       = require('express');
const cors          = require('cors');
const bodyParser    = require('body-parser');
const jwt           = require('jsonwebtoken');
const authRoutes    = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const db            = require('./config/db');
const config        = require('./config/config'); 

const app  = express();
const port = process.env.PORT || 3500;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

// Middleware to auth tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'].split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
};

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', authenticateToken, profileRoutes);

// Start App
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
