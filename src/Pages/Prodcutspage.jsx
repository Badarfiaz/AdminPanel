import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsData } from "../Redux/AdminSlices";

const Prodcutspage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Product Inventory
        </h2>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-1 xl:grid-cols-4 xl:gap-x-6">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="group bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 flex flex-col"
              >
                <div className="relative w-full overflow-hidden bg-[#F8E8EE] rounded-t-lg">
                  <img
                    alt={product.Description || 'Product Image'}
                    src={product.img || 'https://via.placeholder.com/150'}
                    className="w-full h-48 object-cover object-center"
                    style={{ height: '200px' }}
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow items-start justify-between">
                  <h3 className="text-base font-semibold text-gray-800">
                    <span className="hover:text-[#F2BED1]">Item: {product.Title}</span>
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Quantity: {product.quantity || 'No quantity available'}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>No products available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prodcutspage;

