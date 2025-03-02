import { configureStore } from "@reduxjs/toolkit";
import AdminSlices from '../Redux/AdminSlices'
import OrderSlice from '../Redux/OrderSlice'
import CustomerSlice from '../Redux/CustomerSlice'
import OrderRecivedSlice from '../Redux/OrderRecivedSlice'
import ComplaintsSlice from '../Redux/ComplaintsSlice'
const store = configureStore({
  reducer: {
    admin: AdminSlices, // Ensure the 'admin' slice is correctly named
    Orders:OrderSlice,
    Customers:CustomerSlice,
    OrderRecived:OrderRecivedSlice,
    Complains:ComplaintsSlice,
  },
});

export default store;
