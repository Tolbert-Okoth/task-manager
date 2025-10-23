import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toastify CSS
import { Container } from 'react-bootstrap';

// Import Components
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';

// Import Pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private Routes */}
            {/* All routes inside PrivateRoute are protected */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              {/* Add other private routes here, e.g., /profile */}
            </Route>
            
          </Routes>
        </Container>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;