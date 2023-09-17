const db = require('../config/db');

// Function to get user profile
exports.getProfile = (req, res) => {
    const userId = req.user.id;

    // Query the database to get the user's profile
    db.query('SELECT id, email, first_name, last_name, role, industry, city, state, country, postcode, phone, public_profile FROM users WHERE id = ?', [userId], (error, results) => {
        if (error) {
            res.status(500).json({ message: 'Internal server error' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            const userProfile = results[0];
            res.status(200).json(userProfile);
        }
    });
};

// Function to update user profile
exports.updateProfile = (req, res) => {
    const userId = req.user.id;

    // Extract profile data from the request body
    const { email, first_name, last_name, role, industry, city, state, country, postcode, phone, public_profile } = req.body;

    // Update the user's profile in the database
    db.query(
      'UPDATE users SET email=?, first_name=?, last_name=?, role=?, industry=?, city=?, state=?, country=?, postcode=?, phone=?, public_profile=? WHERE id=?',
      [email, first_name, last_name, role, industry, city, state, country, postcode, phone, public_profile, userId],
      (error, results) => {
        if (error) {
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.status(200).json({ message: 'Profile updated successfully' });
        }
      }
    );
};
