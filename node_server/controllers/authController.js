const db       = require('../config/db');
const jwt      = require('jsonwebtoken');
const config   = require('../config/config'); 

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check the user's credentials in the database
  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.sendStatus(500);
    }

    if (results.length === 0) {
      return res.sendStatus(401); // Unauthorized
    }

    const user = results[0];

    // Create and send a JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
      expiresIn: '12h',
    });

    res.json({ token });
  });
};
