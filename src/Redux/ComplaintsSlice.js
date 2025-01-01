import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; // Axios is used for making HTTP requests

export const ComplaintsFetch = createAsyncThunk(
  "Complains/ComplaintsFetch",
  async () => {
    try {
      const response = await fetch("http://localhost:3000/api/Complaints");
      if (!response.ok) {
        throw new Error("Failed to fetch Complaints");
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      return data; // Return the entire data object
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const ComplaintsSlice = createSlice({
  name: 'Complains',
  initialState: {
    Complaints: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ComplaintsFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ComplaintsFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.Complaints = action.payload; // Fixed here: Changed "Complain" to "Complaints"
      })
      .addCase(ComplaintsFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setComplaints } = ComplaintsSlice.actions;

export default ComplaintsSlice.reducer;
