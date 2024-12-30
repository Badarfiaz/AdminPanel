import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { OrderRecivedFetch } from "../Redux/OrderRecivedSlice"; // Adjust the path as needed

const OrderRecived = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.OrderRecived);
  console.log('Fetched Products:', products);

  useEffect(() => {
    dispatch(OrderRecivedFetch());
  }, [dispatch]);const updateOrderStatus = async (Customer_id) => {
    if (!Customer_id) {
      alert('Order ID is missing. Please try again.');
      return;
    }
  
    try {
      // Append the `Order_id` to the URL
      const response = await fetch(`http://localhost:3000/api/UpdateStatus?Customer_id=${Customer_id}`, {
        method: 'POST', // Still using POST for additional data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_status: 'Dispatched', // Additional payload
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert(data.message || 'Order status updated successfully!');
        dispatch(OrderRecivedFetch()); // Re-fetch orders to refresh UI
      } else {
        console.error('Server Error:', data.error);
        alert(data.error || 'Failed to update order status.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg font-semibold">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-pink-100 min-h-screen">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center text-primary"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Orders Received
      </motion.h1>

      {products.length > 0 ? (
        <div className="space-y-6">

          {products.map((order, index) => (
            
            <motion.div
              key={index}
              className="border rounded-lg p-6 shadow-lg bg-white"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >

              {

console.log("Order Object:", order.Customer_id) // Check structure
}
              <h2 className="text-xl font-semibold text-secondary">
                Customer: {order["Customer Name"]} (ID: {order["Customer_id"]})
              </h2>
              <p>Email: {order["Email"]}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="font-semibold text-lg">Products Ordered:</h3>
                  <p>{order["Product Titles"] || "No products listed"}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Quantities Ordered:</h3>
                  <p>{order["Quantities Ordered"] || "No quantities specified"}</p>
                </div>
              </div>
              {order["Product Images"] && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <h3 className="font-semibold text-lg">Product Images:</h3>
                    <div className="flex gap-2 mt-2">
                      {order["Product Images"]
                        .split(", ")
                        .map((img, idx) => (
                          <motion.img
                            key={idx}
                            src={img}
                            alt={`Product ${idx + 1}`}
                            className="w-20 h-20 object-cover rounded-md border"
                            whileHover={{ scale: 1.1 }}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <h3 className="font-semibold text-lg">Payment Methods:</h3>
                  <p>{order["Payment Methods"] || "No payment method provided"}</p>
                </div>
              </div>
              <p className="mt-4">
                <strong>Total Amount:</strong> {order["Total Amount"] || "N/A"}
              </p>
              <p>
                <strong>Order Status:</strong> {order["Order Statuses"] || "No status provided"}
              </p>

              <div className="mt-4">
              <button
  onClick={() => updateOrderStatus(order.Customer_id)}
  className="bg-green-500 rounded p-2 text-white hover:bg-green-600"
>
  Mark as Dispatched
</button>

              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No orders received.</p>
      )}
    </div>
  );
};

export default OrderRecived;
