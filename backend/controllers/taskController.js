const { Task, User } = require('../models');

// --- 1. Create a New Task ---
exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user.id; // <-- From authMiddleware

    if (!title) {
      return res.status(400).json({ message: 'Title is required.' });
    }

    // Create the task and automatically associate it with the logged-in user
    const newTask = await Task.create({
      title,
      description,
      userId: userId, // Link the task to the user
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Server error creating task.' });
  }
};

// --- 2. Get All Tasks for the Logged-in User ---
exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.user.id; // <-- From authMiddleware

    // Find all tasks WHERE the userId matches the logged-in user
    const tasks = await Task.findAll({
      where: { userId: userId },
      order: [['createdAt', 'DESC']], // Show newest tasks first
    });

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error fetching tasks.' });
  }
};

// --- 3. Update a Task ---
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params; // Get task ID from URL (e.g., /api/tasks/123)
    const { title, description, completed } = req.body;
    const userId = req.user.id;

    // 1. Find the task by its ID
    const task = await Task.findByPk(id);

    // 2. If task doesn't exist
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    // 3. Check if the task belongs to the logged-in user
    if (task.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden: You do not own this task.' });
    }

    // 4. User is authorized, update the task
    task.title = title ?? task.title; // Only update if value is provided
    task.description = description ?? task.description;
    task.completed = completed ?? task.completed;

    await task.save();

    res.status(200).json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error updating task.' });
  }
};


// --- 4. Delete a Task ---
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params; // Get task ID from URL
    const userId = req.user.id;

    // 1. Find the task
    const task = await Task.findByPk(id);

    // 2. If task doesn't exist
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    // 3. Check for ownership
    if (task.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden: You do not own this task.' });
    }

    // 4. User is authorized, delete the task
    await task.destroy();

    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error deleting task.' });
  }
};