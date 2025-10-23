import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import taskService from '../services/taskService';

const initialState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// --- Async Thunks ---

// Create new task
export const createTask = createAsyncThunk(
  'tasks/create',
  async (taskData, thunkAPI) => {
    try {
      return await taskService.createTask(taskData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user tasks
export const getTasks = createAsyncThunk(
  'tasks/getAll',
  async (_, thunkAPI) => {
    try {
      return await taskService.getTasks();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user task
export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (id, thunkAPI) => {
    try {
      await taskService.deleteTask(id);
      return id; // Return the id of the deleted task
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// --- NEW THUNK ---
// Update user task
export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ id, taskData }, thunkAPI) => {
    try {
      return await taskService.updateTask(id, taskData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// --- END NEW THUNK ---


// --- The Slice ---
export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    // A synchronous reducer to reset state
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload); // Add the new task to our state
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Tasks
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload; // Set the fetched tasks
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Remove the deleted task from the state
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload
        );
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // --- NEW REDUCERS ---
      .addCase(updateTask.pending, () => {
        // We don't set isLoading to true for toggles
        // to make the UI feel faster.
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.isSuccess = true;
        // Find the task in our state array and update it
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
      });
      // --- END NEW REDUCERS ---
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;