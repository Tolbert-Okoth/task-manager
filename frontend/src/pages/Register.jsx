import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../store/authSlice';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: '', // For password confirmation
  });

  const { username, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { token, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // This "effect" runs whenever the auth state changes
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    
    // If registration is successful, show a message and redirect
    if (isSuccess) {
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    }

    // Reset the auth state (clear errors, success flags, etc.)
    dispatch(reset());

  }, [token, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Passwords do not match');
    } else {
      const userData = {
        username, // This is our email
        password,
      };
      dispatch(register(userData)); // Dispatch the async register thunk
    }
  };

  if (isLoading) {
    return <h3>Loading...</h3>; // We'll add a proper spinner later
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">Register</h1>
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Email (Username)</Form.Label>
                  <Form.Control
                    type="email"
                    name="username"
                    value={username}
                    placeholder="Enter your email"
                    onChange={onChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter password"
                    onChange={onChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password2">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password2"
                    value={password2}
                    placeholder="Confirm password"
                    onChange={onChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;