import { configureStore } from "@reduxjs/toolkit";
import subredditReducer from "./subredditSlice";
import subredditInfoReducer from "./subredditInfoSlice";
import articleReducer from "./articleSlice";

export const store = configureStore({
  reducer: {
    subreddit: subredditReducer,
    subredditInfo: subredditInfoReducer,
    selectedArticle: articleReducer,
  },
});
