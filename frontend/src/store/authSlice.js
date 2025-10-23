import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';

// 1. Get token from localStorage (if it exists)
const token = localStorage.getItem('token');

// 2. Define the initial state for our auth slice
const initialState = {
  token: token ? token : null, // If token exists, use it
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// 3. --- Async Thunks ---
// These functions handle async operations (like API calls)
// and dispatch actions based on the promise status (pending, fulfilled, rejected)

// Register user
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      // The thunk calls our authService
      return await authService.register(user);
    } catch (error) {
      // If there's an error, find the error message
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      // ...and reject the thunk with that message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    // This will return { message, token } and save token to localStorage
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout user
export const logout = createAsyncThunk('auth/logout', async () => {
  // We just call the service, which removes the token
  authService.logout();
  // We don't need to return anything here
});

// 4. --- The Slice Itself ---
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // 'reducers' are for synchronous actions
  reducers: {
    // We can use this to reset the state (e.g., after an error)
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  // 'extraReducers' are for async actions (our thunks)
  extraReducers: (builder) => {
    builder
      // --- Register ---
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Registration is successful, but we don't log them in
        // state.token = null; (it's already null)
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // payload is the error message
        state.token = null;
      })
      // --- Login ---
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token; // Set the token in our state
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.token = null;
      })
      // --- Logout ---
      .addCase(logout.fulfilled, (state) => {
        state.token = null; // Clear the token from our state
      });
  },
});

// 5. Export the 'reset' action and the reducer
export const { reset } = authSlice.actions;
export default authSlice.reducer;