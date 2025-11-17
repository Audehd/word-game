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

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, todo }) => {
    const res = await axios.put(`${API_URL}/${id}`, todo);
    return res.data.data;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data.data;
});

export const markAllAsDone = createAsyncThunk(
  "todos/markAllAsDone",
  async () => {
    const res = await axios.put(`${API_URL}/markAllAsDone`);
    return res.data.data;
  }
);

export const markAllAsNotDone = createAsyncThunk(
  "todos/markAllAsNotDone",
  async () => {
    const res = await axios.put(`${API_URL}/markAllAsNotDone`);
    return res.data.data;
  }
);

export const fetchNotDoneTodos = createAsyncThunk(
  "todos/getNotDoneTodos",
  async () => {
    const res = await axios.get(`${API_URL}/getNotDoneTodos`);
    return res.data.data;
  }
);

export const fetchDoneTodos = createAsyncThunk(
  "todos/getDoneTodos",
  async () => {
    const res = await axios.get(`${API_URL}/getDoneTodos`);
    return res.data.data;
  }
);

// -------------------
// Slice
// -------------------
const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (todo) => todo._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (todo) => todo._id !== action.payload._id
        );
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(markAllAsDone.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(markAllAsDone.rejected, (state, action) => {
        state.error = action.error?.message || "Failed to mark all complete";
      })
      .addCase(markAllAsNotDone.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(markAllAsNotDone.rejected, (state, action) => {
        state.error = action.error?.message || "Failed to mark all complete";
      })
      .addCase(fetchNotDoneTodos.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchNotDoneTodos.rejected, (state, action) => {
        state.error =
          action.error?.message || "Failed to fetch uncompleted todos";
      })
      .addCase(fetchDoneTodos.fulfilled, (state, action) => {
        // merge + dedupe by _id
        const merged = [...state.items, ...action.payload];

        const todos = Array.from(
          new Map(merged.map((todo) => [todo._id, todo])).values()
        );
        state.items = todos;
      })
      .addCase(fetchDoneTodos.rejected, (state, action) => {
        state.error =
          action.error?.message || "Failed to fetch completed todos";
      });
  },
});

export default todosSlice.reducer;
