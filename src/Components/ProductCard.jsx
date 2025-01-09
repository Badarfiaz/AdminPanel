import React from 'react'
import { motion } from 'framer-motion'
import { Trash2 } from 'lucide-react'

export const ProductCard = ({ product, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
    >
      <div className="relative aspect-w-1 aspect-h-1 bg-gray-200">
        <img
          src={product.img || "https://via.placeholder.com/300"}
          alt={product.Title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity opacity-0 hover:opacity-100 flex items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(product.id)}
            className="bg-red-500 text-white p-2 rounded-full"
          >
            <Trash2 size={20} />
          </motion.button>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.Title}</h3>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-indigo-600">Rs{product.Price}</p>
          <p className="text-sm text-blod text-red-500">Qty: {product.quantity}</p>
        </div>
      </div>
    </motion.div>
  )
}
