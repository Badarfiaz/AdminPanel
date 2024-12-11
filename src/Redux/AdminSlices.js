import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'; // Axios is used for making HTTP requests

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
export const addProducts = createAsyncThunk(
  "admin/addProducts",
  
  async ({ title  }, thunkAPI) => {
    try {
       // Make a POST request to your Express backend
      const response = await axios.post('http://localhost:3000/api/addProduct', {
        Title: title,
       
      });

      console.log("Product added successfully:", response.data); // Log response from the backend
      return response.data.product; // Assuming your Express API returns the added product in the "product" field
    } catch (err) {
      console.error("Failed to add product:", err.message);
      return thunkAPI.rejectWithValue(err.response?.data || "Failed to add product");
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
      })

      // Handle adding a product states
      .addCase(addProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products.push(action.payload); // Push the added product to the products array
      })
      .addCase(addProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

  },
});

export default AdminSlice.reducer;

