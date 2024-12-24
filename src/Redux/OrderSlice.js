import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Asynchronous thunk to fetch orders
export const FetchOrders = createAsyncThunk(
  "Orders/FetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/orders");
      if (!response.ok) {
        throw new Error("Failed to fetch Orders");
      }
      const data = await response.json();
      console.log("Fetched data:", data);
      return data; // Return the entire data object
    } catch (error) {
      // Use rejectWithValue for more consistent error handling
      return rejectWithValue(error.message);
    }
  }
);

// Slice for managing Orders state
const OrderSlice = createSlice({
  name: "Orders",
  initialState: {
    Orders: [], // Use plural "Orders" for consistency
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear any previous errors
      })
      .addCase(FetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.Orders = action.payload; // Assign fetched orders
      })
      .addCase(FetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred while fetching orders";
      });
  },
});

// Exporting the reducer to integrate with the Redux store
export default OrderSlice.reducer;
