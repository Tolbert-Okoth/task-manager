import axios from 'axios';

const API_URL = '/api/tasks/';

// Helper function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Create new task
const createTask = async (taskData) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Send the token
    },
  };

  const response = await axios.post(API_URL, taskData, config);
  return response.data;
};

// Get user tasks
const getTasks = async () => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete user task
const deleteTask = async (taskId) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + taskId, config);
  return response.data;
};

// --- NEW FUNCTION ---
// Update user task
const updateTask = async (taskId, taskData) => {
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Note: We send the taskData as the 3rd argument for axios.put
  const response = await axios.put(API_URL + taskId, taskData, config);
  return response.data;
};
// --- END NEW FUNCTION ---


const taskService = {
  createTask,
  getTasks,
  deleteTask,
  updateTask, // <-- Added to export
};

export default taskService;