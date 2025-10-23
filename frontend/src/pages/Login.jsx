import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../store/authSlice';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    
    // If login is successful (or user is already logged in), redirect
    if (isSuccess || token) {
      navigate('/');
    }

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
    const userData = {
      username,
      password,
    };
    dispatch(login(userData)); // Dispatch the async login thunk
  };

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col xs={12} md={6}>
          <Card>
            <Card.Body>
              <h1 className="text-center mb-4">Login</h1>
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

                <Button variant="primary" type="submit" className="w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;