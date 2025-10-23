import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../store/taskSlice';
import { Form, Button, InputGroup } from 'react-bootstrap';

function TaskForm() {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      // We can use toast here later
      console.log('Task title is required');
      return;
    }
    dispatch(createTask({ title })); // Dispatch the thunk
    setTitle(''); // Clear the form
  };

  return (
    <section>
      <Form onSubmit={onSubmit}>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task"
          />
          <Button variant="primary" type="submit">
            Add
          </Button>
        </InputGroup>
      </Form>
    </section>
  );
}

export default TaskForm;