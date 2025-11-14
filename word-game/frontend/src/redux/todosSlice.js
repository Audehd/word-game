import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/todos";

// -------------------
// Async actions for todos
// -------------------
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await axios.get(API_URL);
  return res.data.data;
});

export const createTodo = createAsyncThunk("todos/createTodo", async (todo) => {
  const res = await axios.post(API_URL, todo);
  return res.data.data;
});

export const updateTodo = createAsyncThunk("todos/updateTodo", async ({ id, todo }) => {
  const res = await axios.put(`${API_URL}/${id}`, todo);
  return res.data.data;
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data.data;
});

// -------------------
// Slice
// -------------------
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "succeeded";
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex((todo) => todo._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter((todo) => todo._id !== action.payload._id);
      });
  }
});

export default todosSlice.reducer;