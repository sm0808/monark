// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL');

  // Create the database if it doesn't exist
  db.query('CREATE DATABASE IF NOT EXISTS monarkDB', (err) => {
    if (err) {
      console.error('Error creating database:', err);
      throw err;
    }
    console.log('Database created or already exists');

    // Use the database for subsequent queries
    db.changeUser({ database: 'monarkDB' }, (err) => {
      if (err) {
        console.error('Error selecting database:', err);
        throw err;
      }
      console.log('Using database: monarkDB');
      
      // Create the 'users' table if it doesn't exist
      db.query(`
        CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          first_name VARCHAR(255),
          last_name VARCHAR(255),
          role VARCHAR(255),
          industry VARCHAR(255),
          city VARCHAR(255),
          state VARCHAR(255),
          country VARCHAR(255),
          postcode VARCHAR(255),
          phone VARCHAR(255),
          public_profile BOOLEAN,
          picture VARCHAR(255)
        );
      `, (err) => {
        if (err) {
          console.error('Error creating users table:', err);
          throw err;
        }
        console.log('Table users created or already exists');
        
        // Check if the table is empty then seed
        db.query('SELECT * FROM users WHERE 1', (err, results) => {
            if (err) {
                console.error('Error checking if record exists:', err);
                throw err;
            }

            if (results.length === 0) {
                // Seed the 'users' table with initial data
                db.query(`
                INSERT INTO users (email, password, first_name, last_name, role, industry, city, state, country, postcode, phone, public_profile)
                VALUES ('j.doe@test.com', '123456', 'John', 'Doe', 'Project Manager', 'Marketing', 'Dallas', 'Texas', 'USA', '55123', '+12345678990', 1)
                `, (err) => {
                if (err) {
                    console.error('Error seeding users table:', err);
                    throw err;
                }
                console.log('Initial data seeded into users table');
                });
            } else {
                console.log('Records already exists, skipping seeding.');
            }
        });
      });
    });
  });
});

module.exports = db;
