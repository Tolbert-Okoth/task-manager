import axios from 'axios';

// The URL from our Vite proxy config
const API_URL = '/api/users/';

// Register user
const register = async (userData) => {
  // Make the POST request
  const response = await axios.post(API_URL + 'register', userData);
  
  // axios nests the response data inside a 'data' object
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  
  // If the login is successful and we get a token...
  if (response.data.token) {
    // ...store the token as a plain string in localStorage.
    localStorage.setItem('token', response.data.token);
  }
  
  return response.data;
};

// Logout user
// Logout is just a frontend action: remove the token.
const logout = () => {
  localStorage.removeItem('token');
};

// Export the functions to be used by Redux
const authService = {
  register,
  login,
  logout,
};

export default authService;