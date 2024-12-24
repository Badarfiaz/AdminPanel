import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DeleteProducts = () => {
  const [productId, setProductId] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!productId) {
      toast.error('Please enter a product ID');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3000/api/delete-product/${productId}`);
       navigate('/'); // Redirect to the products page after successful deletion
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  return (
    <div className="py-16">
      <div className="mx-auto max-w-lg px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Delete Product</h2>
        <div className="flex justify-center">
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            placeholder="Enter Product ID to Delete"
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleDelete}
            className="ml-4 px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProducts;
