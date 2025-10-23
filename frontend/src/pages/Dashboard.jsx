import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks, reset } from '../store/taskSlice';
import { Container, Row, Col, ListGroup, Alert } from 'react-bootstrap';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the auth token
  const { token } = useSelector((state) => state.auth);
  // Get the task state
  const { tasks, isLoading, isError, message } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    // If there's an error, log it (we'll use toast later)
    if (isError) {
      console.error(message);
    }

    // If no token, redirect to login
    if (!token) {
      navigate('/login');
    }

    // On component mount, fetch the user's tasks
    dispatch(getTasks());

    // On component unmount, reset the task state
    return () => {
      dispatch(reset());
    };
  }, [token, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <h3>Loading...</h3>; // We'll add a proper spinner later
  }

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center mb-4">Your Task Dashboard</h1>
          
          <TaskForm />

          <section className="mt-4">
            {tasks.length > 0 ? (
              <ListGroup>
                {tasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </ListGroup>
            ) : (
              <Alert variant="info">You have no tasks. Add one above!</Alert>
            )}
          </section>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;