const { User } = require('../models'); // Get the User model from our db object
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// We need our secret key from the .env file
const JWT_SECRET = process.env.JWT_SECRET;

// --- 1. Register a New User ---
exports.registerUser = async (req, res) => {
  try {
    // 1. Get username and password from the request body
    const { username, password } = req.body;

    // 2. Basic Validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide a username and password.' });
    }

    // 3. Check if user already exists
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken.' });
    }

    // 4. Create the new user
    // The password hashing is done automatically by the 'beforeCreate' hook
    // we defined in the User model!
    const newUser = await User.create({
      username,
      password,
    });

    // 5. Send a success response (don't send the password back!)
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      message: 'User registered successfully!',
    });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Server error during registration.', error: error.message });
  }
};


// --- 2. Login an Existing User ---
exports.loginUser = async (req, res) => {
  try {
    // 1. Get username and password from request body
    const { username, password } = req.body;

    // 2. Find the user in the database
    const user = await User.findOne({ where: { username } });

    // 3. If user not found, or password doesn't match, send error
    // We use bcrypt.compare to securely compare the plain-text password
    // with the hashed password stored in the database.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

    // 4. User is valid! Create a JWT
    // The token payload contains user info (but not sensitive info like password)
    const tokenPayload = {
      id: user.id,
      username: user.username,
    };

    // 'Sign' the token with our secret key.
    // It will expire in 1 hour (a good standard practice)
    const token = jwt.sign(
      tokenPayload, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    // 5. Send the token back to the client
    res.status(200).json({
      message: 'Login successful!',
      token: token,
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error during login.', error: error.message });
  }
};