import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { ComplaintsFetch } from "../Redux/ComplaintsSlice";

function OrderComplaints() {
  const dispatch = useDispatch();
  const { Complaints, loading, error } = useSelector((state) => state.Complains);

  useEffect(() => {
    dispatch(ComplaintsFetch());
  }, [dispatch]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Order Complaints</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(Complaints) && Complaints.length > 0 ? (
          Complaints.map((complaint) => (
            <motion.div
              key={complaint["Complaint ID"]}
              className="bg-white shadow-lg rounded-lg p-6 space-y-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h2 className="text-xl font-semibold mb-2">{complaint["Product Title"]}</h2>
              <img
                src={complaint["Product Image"]}
                alt={complaint["Product Title"]}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <div className="space-y-2">
                <p><strong>Complaint ID:</strong> {complaint["Complaint ID"]}</p>
                <p><strong>Description:</strong> {complaint["Complaint Description"]}</p>
                <p><strong>Date:</strong> {new Date(complaint["Complaint Date"]).toLocaleDateString()}</p>
                <p><strong>Status:</strong> {complaint["Resolution Status"]}</p>
                <p><strong>Order ID:</strong> {complaint["Order ID"]}</p>
                <p><strong>Customer Name:</strong> {complaint["Customer Name"]}</p>
                <p><strong>Email:</strong> {complaint["Customer Email"]}</p>
                <p><strong>Phone Number:</strong> {complaint["Customer Phone Number"]}</p>
                <p><strong>Quantity:</strong> {complaint["Order Quantity"]}</p>
                <p><strong>Total Amount:</strong> ${complaint["Order Total Amount"]}</p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-600">No complaints found.</div>
        )}
      </div>
    </div>
  );
}

export default OrderComplaints;
