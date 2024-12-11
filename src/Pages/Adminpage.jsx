import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProducts } from '../Redux/AdminSlices';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { motion } from 'framer-motion';

function AdminDashboard() {
  // Initialize state with all fields, ensuring they are not undefined
  const [items, setItems] = useState([{ name: '', description: '', category: '', quantity: '', price: '', img: '' , img2:'' , img3:'' , img4:''}]);
  const dispatch = useDispatch();

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delayChildren: 0.2,
        staggerChildren: 0.2, // Slows down the stagger between items
      },
    },
  };
  
  // Variants for the individual items
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -20,
      backgroundColor: '#f3d1ca',
    },
    visible: {
      opacity: 1,
      y: 0,
      backgroundColor: "#fdf9f9", // Background reveal animation
      transition: {
        duration: 0.6, // Slows down the reveal animation for each item
      },
    },
  };
  
  // const containerVariants = {
  //   hidden: { opacity: 0, scale: 0.9 },
  //   visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  //   hover: { scale: 1.05, transition: { duration: 0.2 } },
  // }; 

  const CategoryDropdown = ({ selectedCategory, onSelectCategory }) => {
    return (
      <Menu as="div" className="relative inline-block text-left">
        {/* Dropdown Button */}
        <Menu.Button className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium flex items-center">
          {selectedCategory || "Select Category"}
          <ChevronDownIcon className="w-4 h-4 ml-1" />
        </Menu.Button>
  
        {/* Animated Dropdown Menu */}
        <Menu.Items
          as={motion.div}
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          className="absolute mt-2 w-40 shadow-lg rounded-md ring-1 ring-black ring-opacity-5 focus:outline-none z-10 origin-top-right"
        >
          {/* Dropdown Items */}
          {["Necklaces", "Bracelets", "EarRings", "Nails","Rings", "Bundles"].map((category) => (
            <Menu.Item key={category}>
              {({ active }) => (
                <motion.div
                  variants={itemVariants}
                  className=""
                >
                  <button
                    onClick={() => onSelectCategory(category)}
                    className={`block px-4 py-2 text-sm w-full text-left
                              ${active ? "bg-[#F8E8EE] text-[#D87C9E]" : "text-[#F2BED1]   hover:text-[#D87C9E]"}`}
                  >
                    {category}
                  </button>
                </motion.div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    );
  };
  
  const handleSelectCategory = (index, category) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], category };
    setItems(newItems);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newItems = [...items];
    newItems[index][name] = value; // Ensure the correct field is updated
    setItems(newItems);
  };

  const handleAddRow = () => {
    setItems([...items, { name: '', description: '', category: '', quantity: '', price: '', img: '' , img2: '', img3:'' , img4:'' }]);
  };

  const handleRemoveRow = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  
    console.log('dash: ', items);
    // Dispatch each item in the array to add to the database
    items.forEach(item => {
      const { name, description, category, quantity, price, img, img2, img3, img4 } = item;
      dispatch(addProducts({
        title: name,
        description: description || 'Default description',
        price: parseInt(price),
        category: category || 'Default category',
        quantity: parseInt(quantity) || 1, // Ensure quantity is a number
        img: img || `https://placehold.co/600x400?text=${category}`,
        img2: img2 || `https://placehold.co/600x400?text=${category}`,
        img3: img3 || `https://placehold.co/600x400?text=${category}`,
        img4: img4 || `https://placehold.co/600x400?text=${category}` // Corrected for img4
      }));
      
    });
    setItems([{ name: '', description: '', category: '', quantity: '', price: '', img: '', img2: '', img3: '', img4: '' }]);
  };
  

  return (
    <div className="p-6 ">
       <div
    aria-hidden="true"
    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
  >
    <div
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
      className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
    />
  </div>
  
  <div
    aria-hidden="true"
    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
  >
    <div
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
      className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      />
      
   </div>
   <form
      onSubmit={handleSubmit}
      className="space-y-6 p-4 sm:p-6 bg-[#F9F5F6] rounded-lg shadow-md"
      initial="hidden"
     >
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="bg-white p-4 rounded-lg shadow-sm border border-[#F2BED1] space-y-4"
           whileHover="hover"
        >
          {/* Name input */}
          <div className="flex flex-col space-y-2">
            <motion.label
              className="text-sm font-medium text-[#333]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
            >
              Name
            </motion.label>
            <motion.input
  type="text"
  name="name"
  value={item.name}
  onChange={(event) => handleInputChange(index, event)}
  className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
  placeholder="Enter name"
  required
  style={{ fontSize: '16px' }} // Ensures no zooming on mobile
  whileFocus={{ scale: 1.05 }}
/>

          </div>

          {/* Category Dropdown */}
          <motion.div className="flex flex-col space-y-2">
            <CategoryDropdown
              selectedCategory={item.category}
              onSelectCategory={(category) => handleSelectCategory(index, category)}
            />
          </motion.div>

          {/* Other inputs */}
          <motion.div className="flex flex-col space-y-2">
            <motion.label 
             className="text-sm font-medium text-[#333]"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
            
           >Description</motion.label>
            <motion.input
              type="text"
              name="description"
              value={item.description}
              onChange={(event) => handleInputChange(index, event)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              placeholder="Enter description"
              required
              style={{ fontSize: '16px' }} // Ensures no zooming on mobile

              whileFocus={{ scale: 1.05 }}
            />
          </motion.div>

          {/* Quantity input */}
          <motion.div className="flex flex-col space-y-2">
            <motion.label 
             className="text-sm font-medium text-[#333]"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
 >Quantity</motion.label >
            <motion.input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(event) => handleInputChange(index, event)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              placeholder="Enter quantity"
              required
              style={{ fontSize: '16px' }} // Ensures no zooming on mobile
              whileFocus={{ scale: 1.05 }}
            />
          </motion.div>

          {/* Price input */}
          <motion.div className="flex flex-col space-y-2">
          <motion.label 
             className="text-sm font-medium text-[#333]"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
          >Price</motion.label >

            <motion.input
              type="number"
              name="price"
              value={item.price}
              onChange={(event) => handleInputChange(index, event)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              placeholder="Enter price"
              required
              style={{ fontSize: '16px' }} // Ensures no zooming on mobile

              whileFocus={{ scale: 1.05 }}
            />
          </motion.div>

          {/* Image inputs */}
          <motion.div className="flex flex-col space-y-2">
            <motion.label 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
            
            className="text-sm font-medium text-[#333]">Thumdnail URL</motion.label>
            <motion.input
              type="text"
              name="img"
              value={item.img}
              onChange={(event) => handleInputChange(index, event)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              placeholder="Enter image URL"
              required
              style={{ fontSize: '16px' }} // Ensures no zooming on mobile

              whileFocus={{ scale: 1.05 }}
            />
          </motion.div>



          <motion.div className="flex flex-col space-y-2">
            <motion.label 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
            
            className="text-sm font-medium text-[#333]">Img1 URL</motion.label>
            <motion.input
              type="text"
              name="img2"
              value={item.img2}
              onChange={(event) => handleInputChange(index, event)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              placeholder="Enter image URL"
              required
              style={{ fontSize: '16px' }} // Ensures no zooming on mobile

              whileFocus={{ scale: 1.05 }}
            />
          </motion.div>
          <motion.div className="flex flex-col space-y-2">
            <motion.label 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
            
            className="text-sm font-medium text-[#333]">Img2 URL</motion.label>
            <motion.input
              type="text"
              name="img3"
              value={item.img3}
              onChange={(event) => handleInputChange(index, event)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              placeholder="Enter image URL"
              style={{ fontSize: '16px' }} // Ensures no zooming on mobile
               whileFocus={{ scale: 1.05 }}
            />
          </motion.div>
          <motion.div className="flex flex-col space-y-2">
            <motion.label 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.1 } }}
            
            className="text-sm font-medium text-[#333]">Img3 URL</motion.label>
            <motion.input
              type="text"
              name="img4"
              value={item.img4}
              onChange={(event) => handleInputChange(index, event)}
              className="w-full border border-[#F2BED1] rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#FDCEDF] text-sm"
              placeholder="Enter image URL"
              required
              style={{ fontSize: '16px' }} // Ensures no zooming on mobile
              whileFocus={{ scale: 1.05 }}
            />
          </motion.div>

          {/* Remove Button */}
          <motion.button
            type="button"
            onClick={() => handleRemoveRow(index)}
            className="text-[#FDCEDF] hover:text-[#F8E8EE] transition-colors duration-200 text-sm mt-2 self-end"
            whileHover={{ scale: 1.1 }}
          >
            Remove
          </motion.button>
        </motion.div>
      ))}

      {/* Add Row and Post Buttons */}
      <motion.div className="flex flex-col sm:flex-row gap-2 mt-4">
        <motion.button
          type="button"
          onClick={handleAddRow}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-[#F2BED1] text-white font-medium rounded-md shadow-sm hover:bg-[#FDCEDF] transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
        >
          Add Row
        </motion.button>
        <motion.button
          type="submit"
          className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-[#F2BED1] text-white font-medium rounded-md shadow-sm hover:bg-[#FDCEDF] transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
        >
          Post
          <CloudDoneOutlinedIcon fontSize="medium" className="ml-1" />
        </motion.button>
      </motion.div>
    </form>
    </div>
  );
}

export default AdminDashboard;