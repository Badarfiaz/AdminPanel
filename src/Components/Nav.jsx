import React, { useState } from 'react';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Import Framer Motion

const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Framer Motion variants for staggered items
  const sidebarVariants = {
    hidden: { x: '100%' }, // Sidebar slides in from the right
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1, // Items appear one by one
        delayChildren: 0.2, // Delay before the first item appears
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 }, // Items are hidden off the side
    visible: { opacity: 1, x: 0 }, // Items fade and slide into view
  };

  // Function to handle closing the sidebar when clicking outside
  const handleOverlayClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-[#F9F5F6] py-4 px-6 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Name */}
        <Link 
          onClick={() => setIsSidebarOpen(false)} 
          to={'/'} 
          className="text-2xl font-bold text-[#F2BED1]"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          EnchantByReem
        </Link>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-[#F2BED1] focus:outline-none"
          >
            <Bars3Icon className="w-8 h-8" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden sm:flex sm:items-center sm:space-x-6">
          <Link onClick={() => setIsSidebarOpen(false)} to={"/"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
            Dashboard
          </Link>
          <Link onClick={() => setIsSidebarOpen(false)} to={"/Productpage"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
            Product-info
          </Link>
          <Link onClick={() => setIsSidebarOpen(false)} to={"/order"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
            Order-recived
          </Link>
        </div>

        {/* Call to Action Button */}
        <div className="hidden sm:flex items-center space-x-3">         
          <button className="inline-flex font-semibold items-center px-6 py-2 bg-[#F2BED1] text-white font-medium rounded-full shadow-sm hover:bg-[#FDCEDF] transition-colors duration-200">
            POST
          </button>
        </div>
      </div>

      {/* Overlay for closing the sidebar */}
      {isSidebarOpen && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black bg-opacity-50 z-40" // Overlay styles
        />
      )}

      {/* Sidebar for Mobile with Framer Motion */}
      <motion.div
        className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform sm:hidden z-50`}
        initial="hidden"
        animate={isSidebarOpen ? 'visible' : 'hidden'}
        variants={sidebarVariants} // Apply the animation
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div className="text-2xl font-bold text-[#F2BED1]">Admin</div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-[#F2BED1] focus:outline-none"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
        </div>
        
        {/* Sidebar Items with staggered animation */}
        <motion.div className="flex flex-col px-6 py-4 space-y-4">
          <motion.div variants={itemVariants}>
            <Link onClick={() => setIsSidebarOpen(false)} to={"/"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
              Dashboard
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link onClick={() => setIsSidebarOpen(false)} to={"/Productpage"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
              Product-info
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link onClick={() => setIsSidebarOpen(false)} to={"/order"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
              Order-recived
            </Link>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link onClick={() => setIsSidebarOpen(false)} to={"/checked"} className="text-[#F2BED1] hover:text-[#F8E8EE] font-medium transition-colors duration-300">
              Order-Completed
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </nav>
  );
};

export default Nav;