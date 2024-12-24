import { configureStore } from "@reduxjs/toolkit";
import AdminSlices from '../Redux/AdminSlices'
import OrderSlice from '../Redux/OrderSlice'
import CustomerSlice from '../Redux/CustomerSlice'
const store = configureStore({
  reducer: {
    admin: AdminSlices, // Ensure the 'admin' slice is correctly named
    Orders:OrderSlice,
    Customer:CustomerSlice,
  },
});

export default store;
