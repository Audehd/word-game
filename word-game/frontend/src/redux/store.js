import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice";
import labelsReducer from "./labelsSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    labels: labelsReducer
  }
});