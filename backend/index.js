const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

// Import the db object from models/index.js
const db = require('./models');

const app = express();
const PORT = process.env.PORT || 5001; // Use port 5001 if .env is not set

// --- Middleware ---
// 1. Enable CORS for all routes
app.use(cors());

// 2. Enable Express to parse JSON request bodies
app.use(express.json());

// --- Test Route ---
// A simple route to make sure the server is running
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Task Manager API!' });
});

// --- API Routes ---
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));


// --- Start Server & Connect to Database ---
const startServer = async () => {
  try {
    // Test the database connection
    await db.sequelize.authenticate();
    console.log('Database connection has been established successfully. 🚀');

    // Sync models with the database
    // { alter: true } checks the current state of the database tables
    // and performs non-destructive changes to match the models.
    await db.sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();