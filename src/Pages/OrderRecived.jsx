import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchOrders } from "../Redux/OrderSlice";
import LoaderProduct from "../Components/LoaderProduct";
import { fetchProductsData } from "../Redux/AdminSlices";
import { CustomerFetch } from "../Redux/CustomerSlice";
import CustomerDetails from "../Components/CustomerDetails"; // Import the new component

const OrderRecived = () => {
  const dispatch = useDispatch();
  const { Orders = [], loading, error } = useSelector((state) => state.Orders); // Default to empty array
  const { products = [] } = useSelector((state) => state.admin); // Default to empty array
  const { customers = [] } = useSelector((state) => state.Customer); // Default to empty array

  useEffect(() => {
    dispatch(FetchOrders());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(fetchProductsData());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(CustomerFetch());
  }, [dispatch]);

  if (loading) {
    return <LoaderProduct />;
  }

  if (error) {
    return <div className="text-red-500">Error fetching data</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Order Details</h2>
      
      {/* Orders Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        {Orders.map((order) => {
          const customer = customers.find((cust) => cust.id === order.Customer_id);
          
          return (
            <div key={order.Order_id} className="border-b border-gray-200 mb-6">
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Order Details</h3>
                  <p><strong>Order ID:</strong> {order.Order_id}</p>
                  <p><strong>Customer ID:</strong> {order.Customer_id}</p>
                  <p><strong>Quantity:</strong> {order.quantity}</p>
                  <p><strong>Total Amount:</strong> ${order.total_amount}</p>
                  <p><strong>Status:</strong> {order.order_status}</p>
                </div>

                {/* Render customer info only if customer exists */}
                {customer && (
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">Customer Information</h3>
                    <p><strong>Name:</strong> {customer.first_name} {customer.last_name}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone:</strong> {customer.phone_number}</p>
                    <p><strong>Address:</strong> {customer.address}, {customer.city}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Customers Section */}
      <CustomerDetails customers={customers} /> {/* Use the new CustomerDetails component */}
    </div>
  );
};

export default OrderRecived;
