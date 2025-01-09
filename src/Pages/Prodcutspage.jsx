import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchProductsData, RemoveProducts } from '../Redux/AdminSlices'
import { ProductCard } from '../Components/ProductCard'
import { Loader2, AlertCircle } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Productspage = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector((state) => state.admin)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [id, setid] = useState(null)

  useEffect(() => {
    dispatch(fetchProductsData())
  }, [dispatch])

  const handleRemoveProduct = (id) => {
    setid(id)
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/deleteProduct/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete product')
      }
      toast.success('Product deleted successfully')
      window.location.reload();

    } catch (error) {
      console.error('Error:', error)
      toast.error('Failed to delete product')
    } finally {
      setIsDeleteModalOpen(false)
      setid(null)
    }
  }

  const totalCost = Array.isArray(products)
    ? products.reduce((acc, product) => acc + (product.Price || 0) * (product.quantity || 1), 0)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center text-gray-900 mb-8"
        >
          Product Inventory
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Total Inventory Value</h2>
            <p className="text-3xl font-bold text-indigo-600">₹{totalCost.toFixed(2)}</p>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-500 flex items-center justify-center">
            <AlertCircle className="mr-2" />
            Error: {error}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence>
              {Array.isArray(products) && products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onDelete={() => handleRemoveProduct(product.id)} // Passing id for delete
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full text-center text-gray-500 py-12"
                >
                  No products available.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg p-6 max-w-sm w-full"
          >
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this product?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default Productspage
