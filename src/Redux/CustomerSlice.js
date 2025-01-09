import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; // Axios is used for making HTTP requests

export const CustomerFetch = createAsyncThunk(
  "Customer/fetchProductsData",
  async () => {
    try {
      const response = await fetch("http://localhost:3000/api/customer");
      if (!response.ok) {
        throw new Error("Failed to fetch Customer");
      }

      const data = await response.json();
      console.log("Customer data:", data);
      return data; // Return the entire data object
    } catch (error) {
      throw new Error(error.message);
    }
  }
);


const CustomerSlice = createSlice({
  name: 'Customers',
  initialState: {
    Customer: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CustomerFetch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CustomerFetch.fulfilled, (state, action) => {
        state.loading = false;
        state.Customer = action.payload; // Directly assign the payload to products
      })
      .addCase(CustomerFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  },
});
export const { setCustomers } = CustomerSlice.actions;

export default CustomerSlice.reducer;

