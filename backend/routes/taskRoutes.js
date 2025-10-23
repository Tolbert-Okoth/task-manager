const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// --- Protected Routes ---
// We apply the authMiddleware to ALL routes in this file.
// This means no one can access any of these endpoints
// without a valid 'Bearer' token.
router.use(authMiddleware);

// POST /api/tasks
// Create a new task
router.post('/', taskController.createTask);

// GET /api/tasks
// Get all of the user's tasks
router.get('/', taskController.getAllTasks);

// PUT /api/tasks/:id
// Update a specific task
router.put('/:id', taskController.updateTask);

// DELETE /api/tasks/:id
// Delete a specific task
router.delete('/:id', taskController.deleteTask);

module.exports = router;