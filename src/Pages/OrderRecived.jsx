'use client'

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { OrderRecivedFetch } from '../Redux/OrderRecivedSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Package, List, Truck, Loader2, AlertCircle } from 'lucide-react'
import { Avatar } from '@mui/material'

const OrderReceived = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.OrderRecived)

  useEffect(() => {
    dispatch(OrderRecivedFetch())
  }, [dispatch])

  const updateOrderStatus = async (Customer_id) => {
    if (!Customer_id) {
      alert('Order ID is missing. Please try again.')
      return
    }

    try {
      const response = await fetch(`http://localhost:3000/api/UpdateStatus?Customer_id=${Customer_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_status: 'Dispatched',
        }),
      })

      const data = await response.json()

      if (response.ok) {
        alert(data.message || 'Order status updated successfully!')
        dispatch(OrderRecivedFetch())
      } else {
        alert(data.error || 'Failed to update order status.')
      }
    } catch (error) {
      alert('An error occurred. Please try again later.')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-100 to-purple-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center text-pink-600 text-xl"
        >
          <Loader2 className="animate-spin w-8 h-8 mr-3" />
          Loading...
        </motion.div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-pink-100 to-purple-200">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-red-600 text-xl flex items-center"
        >
          <AlertCircle className="w-8 h-8 mr-3" />
          {error}
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-100 to-purple-200 p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center text-purple-800 mb-8"
      >
        Orders Received
      </motion.h1>

      <AnimatePresence>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((order, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-md p-6 space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <h2 className="text-xl font-bold text-purple-700">{order["Customer Name"]}</h2>
                    <span className="text-sm text-gray-500">ID: {order["Customer_id"]}</span>
                  </div>
                  <div className="text-gray-600 flex items-center">
                    <Mail className="w-5 h-5 mr-2" />
                    {order["Email"]}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {order["Product Images"] && (
                    <div className="grid grid-cols-3 gap-2">
                      {order["Product Images"]
                        .split(',')
                        .map((img, idx) => (
                          <img
                            key={idx}
                            src={img.trim()}
                            alt={`Product ${idx + 1}`}
                            className="w-full h-20 object-cover rounded-md border"
                          />
                        ))}
                    </div>
                  )}
                  </div>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-purple-50 p-4 rounded-md space-y-2">
                    <div className="flex items-center">
                      <Package className="w-5 h-5 text-purple-600 mr-2" />
                      <span>{order["Product Titles"] || "No products listed"}</span>
                    </div>
                    <div className="flex items-center">
                      <List className="w-5 h-5 text-purple-600 mr-2" />
                      <span>{order["Quantities Ordered"] || "No quantities specified"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-lg font-bold text-purple-700">
                    Total: {order["Total Amount"] || "N/A"}
                  </span>
                  <span className="text-sm font-medium text-gray-600">
                    Status: {order["Order Statuses"] || "No status"}
                  </span>
                </div>

                <button
                  onClick={() => updateOrderStatus(order.Customer_id)}
                  className="w-full py-2 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg shadow hover:from-pink-600 hover:to-purple-600 transition-all"
                >
                  <Truck className="w-5 h-5 inline-block mr-2" />
                  Mark as Dispatched
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center text-gray-600 text-lg"
          >
            No orders received.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OrderReceived
