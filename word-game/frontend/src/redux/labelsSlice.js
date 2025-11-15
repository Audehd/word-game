import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/labels";

// -------------------
// Async actions for labels
// -------------------
export const fetchLabels = createAsyncThunk("labels/fetchLabels", async () => {
  const res = await axios.get(API_URL);
  return res.data.data;
});

export const createLabel = createAsyncThunk(
  "labels/createLabel",
  async (label) => {
    const res = await axios.post(API_URL, label);
    return res.data.data;
  }
);

export const updateLabel = createAsyncThunk(
  "labels/updateLabel",
  async ({ id, label }) => {
    const res = await axios.put(`${API_URL}/${id}`, label);
    return res.data.data;
  }
);

export const deleteLabel = createAsyncThunk(
  "labels/deleteLabel",
  async (id) => {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data.data;
  }
);

// -------------------
// Slice
// -------------------
const labelsSlice = createSlice({
  name: "labels",
  initialState: {
    items: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLabels.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(fetchLabels.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createLabel.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createLabel.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateLabel.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (label) => label._id === action.payload._id
        );
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(updateLabel.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteLabel.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (label) => label._id !== action.payload._id
        );
      })
      .addCase(deleteLabel.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default labelsSlice.reducer;
