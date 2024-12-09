import { configureStore } from "@reduxjs/toolkit";
import AdminSlices from '../Redux/AdminSlices'

const store = configureStore({
  reducer: {
    admin: AdminSlices, // Ensure the 'admin' slice is correctly named
  },
});

export default store;
