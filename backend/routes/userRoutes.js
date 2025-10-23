const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define the routes

// Route: POST /api/users/register
// Desc:  Register a new user
router.post('/register', userController.registerUser);

// Route: POST /api/users/login
// Desc:  Login a user and get a token
router.post('/login', userController.loginUser);


module.exports = router;