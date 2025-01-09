'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addProducts } from '../Redux/AdminSlices'
import { Menu } from "@headlessui/react"
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, ChevronDown, Camera, DollarSign, Box, Type, FileText, Tag } from 'lucide-react'

function AdminDashboard() {
  const [items, setItems] = useState([{ name: '', description: '', category: '', quantity: '', price: '', img: '', img2: '', img3: '', img4: '' }])
  const dispatch = useDispatch()

  const CategoryDropdown = ({ selectedCategory, onSelectCategory }) => {
    return (
      <Menu as="div" className="relative inline-block text-left w-full">
        <Menu.Button className="w-full text-gray-700 hover:text-pink-600 font-medium flex items-center justify-between p-2 border border-gray-300 rounded-md bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
          <span>{selectedCategory || "Select Category"}</span>
          <ChevronDown className="w-5 h-5 ml-2" />
        </Menu.Button>
        <Menu.Items className="absolute mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 focus:outline-none">
          {[
            "Necklaces", "Bracelets", "EarRings", "Nails", "Rings", "Bundles"
          ].map((category) => (
            <Menu.Item key={category}>
              {({ active }) => (
                <button
                  onClick={() => onSelectCategory(category)}
                  className={`${
                    active ? 'bg-pink-100 text-pink-600' : 'text-gray-700'
                  } group flex w-full items-center px-4 py-2 text-sm`}
                >
                  {category}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    )
  }

  const handleSelectCategory = (index, category) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], category }
    setItems(newItems)
  }

  const handleInputChange = (index, event) => {
    const { name, value } = event.target
    const newItems = [...items]
    newItems[index][name] = value
    setItems(newItems)
  }

  const handleAddRow = () => {
    setItems([...items, { name: '', description: '', category: '', quantity: '', price: '', img: '', img2: '', img3: '', img4: '' }])
  }

  const handleRemoveRow = (index) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    items.forEach(item => {
      const { name, description, category, quantity, price, img, img2, img3, img4 } = item
      dispatch(addProducts({
        title: name,
        description: description || 'Default description',
        price: parseInt(price),
        category: category || 'Default category',
        quantity: parseInt(quantity) || 1,
        img: img || `https://placehold.co/600x400?text=${category}`,
        img2: img2 || `https://placehold.co/600x400?text=${category}`,
        img3: img3 || `https://placehold.co/600x400?text=${category}`,
        img4: img4 || `https://placehold.co/600x400?text=${category}`
      }))
    })
    setItems([{ name: '', description: '', category: '', quantity: '', price: '', img: '', img2: '', img3: '', img4: '' }])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Insert</h1>
          <form onSubmit={handleSubmit} className="space-y-8">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-50 p-6 rounded-xl shadow-md space-y-4 relative"
                >
                  <button
                    type="button"
                    onClick={() => handleRemoveRow(index)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <Type className="w-5 h-5 mr-2 text-pink-500" />
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={item.name}
                        onChange={(event) => handleInputChange(index, event)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                        placeholder="Enter name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <Tag className="w-5 h-5 mr-2 text-pink-500" />
                        Category
                      </label>
                      <CategoryDropdown
                        selectedCategory={item.category}
                        onSelectCategory={(category) => handleSelectCategory(index, category)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <FileText className="w-5 h-5 mr-2 text-pink-500" />
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={item.description}
                      onChange={(event) => handleInputChange(index, event)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                      placeholder="Enter description"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <Box className="w-5 h-5 mr-2 text-pink-500" />
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        onChange={(event) => handleInputChange(index, event)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                        placeholder="Enter quantity"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center text-sm font-medium text-gray-700">
                        <DollarSign className="w-5 h-5 mr-2 text-pink-500" />
                        Price
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={item.price}
                        onChange={(event) => handleInputChange(index, event)}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                        placeholder="Enter price"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-medium text-gray-700">
                      <Camera className="w-5 h-5 mr-2 text-pink-500" />
                      Thumbnail URL
                    </label>
                    <input
                      type="text"
                      name="img"
                      value={item.img}
                      onChange={(event) => handleInputChange(index, event)}
                      className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200"
                      placeholder="Enter image URL"
                      required
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="flex justify-between items-center">
              <motion.button
                type="button"
                onClick={handleAddRow}
                className="flex items-center text-pink-600 hover:text-pink-700 font-medium transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Product
              </motion.button>
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-md px-6 py-2 font-medium hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Submit Products
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}

export default AdminDashboard

