import React from 'react';
import { useDispatch } from 'react-redux';
// 1. Import updateTask
import { deleteTask, updateTask } from '../store/taskSlice';
// 2. Import Form
import { ListGroup, CloseButton, Form } from 'react-bootstrap';

function TaskItem({ task }) {
  const dispatch = useDispatch();

  // 3. Create the toggle handler
  const handleToggle = () => {
    // Dispatch the update with the *opposite* completed status
    dispatch(
      updateTask({
        id: task.id,
        taskData: { completed: !task.completed },
      })
    );
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      {/* 4. Add the Checkbox */}
      <Form.Check
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        className="me-3"
      />

      {/* 5. Add a flex-grow div to push the 'X' button to the right */}
      <div style={{ flexGrow: 1 }}>
        {/* 6. Add style to strike through completed tasks */}
        <h5
          style={{
            textDecoration: task.completed ? 'line-through' : 'none',
            color: task.completed ? '#6c757d' : '#212529', // (Optional)
          }}
        >
          {task.title}
        </h5>
        {task.description && <p>{task.description}</p>}
        <small>Created: {new Date(task.createdAt).toLocaleString()}</small>
      </div>

      <CloseButton onClick={() => dispatch(deleteTask(task.id))} />
    </ListGroup.Item>
  );
}

export default TaskItem;