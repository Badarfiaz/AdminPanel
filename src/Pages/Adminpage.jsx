import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
    const [productData, setProductData] = useState({
        Title: '',
        Description: '',
        Price: '',
        Category: '',
        img: '',
        quantity: '',
        img2: '',
        img3: '',
        img4: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/addProduct', productData);
            alert('Product added successfully');
            console.log(response.data);
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Error adding product');
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-4">Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="Title">
                        Title
                    </label>
                    <input
                        type="text"
                        name="Title"
                        id="Title"
                        value={productData.Title}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="Description">
                        Description
                    </label>
                    <textarea
                        name="Description"
                        id="Description"
                        value={productData.Description}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="Price">
                        Price
                    </label>
                    <input
                        type="number"
                        name="Price"
                        id="Price"
                        value={productData.Price}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="Category">
                        Category
                    </label>
                    <input
                        type="text"
                        name="Category"
                        id="Category"
                        value={productData.Category}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="img">
                        Image URL
                    </label>
                    <input
                        type="text"
                        name="img"
                        id="img"
                        value={productData.img}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="quantity">
                        Quantity
                    </label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={productData.quantity}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminPage;
