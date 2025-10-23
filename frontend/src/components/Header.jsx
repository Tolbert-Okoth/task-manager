import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/authSlice';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get the 'token' from our auth state
  const { token } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout()); // Dispatch the logout thunk
    dispatch(reset()); // Reset the auth state
    navigate('/login'); // Redirect to login
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Task Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            {token ? (
              // If user is logged in
              <Button variant="outline-light" onClick={onLogout}>
                Logout
              </Button>
            ) : (
              // If user is logged out
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;