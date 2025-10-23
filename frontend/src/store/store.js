import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import taskReducer from './taskSlice'; // 1. Import the task reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer, // 2. Add it to the store
  },
});