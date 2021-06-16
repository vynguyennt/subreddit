import { configureStore } from '@reduxjs/toolkit';
import subredditReducer from './subredditSlice';

export const store = configureStore({
  reducer: {
    subreddit: subredditReducer 
  },
});
