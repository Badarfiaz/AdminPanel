import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProductsData = createAsyncThunk(
  "Product/fetchProductsData",
  async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      return data; // Return the entire data object
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const AdminSlice = createSlice({
  name: 'admin',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsData.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Directly assign the payload to products
      })
      .addCase(fetchProductsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default AdminSlice.reducer;

