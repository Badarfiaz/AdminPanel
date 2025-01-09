import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, ShoppingBag, Info, Phone, Star, AlertTriangle, Menu, X } from 'lucide-react'; // Replacing heroicons for consistency

const navItems = [
  { name: 'Dashboard', to: '/', icon: Home },
  { name: 'Inventory', to: '/Productpage', icon: ShoppingBag },
  { name: 'Orders', to: '/order', icon: Info },
  { name: 'Complaints', to: '/Complaints', icon: AlertTriangle },
  { name: 'Logout', to: '/login', icon: AlertTriangle },
];

const Nav = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-pink-100 to-purple-100 py-4 px-6 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-pink-600" style={{ fontFamily: "'Dancing Script', cursive" }}>
          EnchantByReem
        </Link>

        <div className="hidden md:flex md:items-center md:space-x-6">
          {navItems.map((item) => (
            <Link key={item.name} to={item.to} className="flex items-center text-pink-600 hover:text-pink-700 font-medium transition-colors duration-300">
              <item.icon className="w-5 h-5 mr-1" />
              {item.name}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden text-pink-600 hover:text-pink-700"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform z-50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <span className="text-2xl font-bold text-pink-600">Admin Menu</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-pink-600 hover:text-pink-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <motion.div className="flex flex-col px-6 py-4 space-y-4">
              {navItems.map((item) => (
                <motion.div key={item.name} variants={itemVariants}>
                  <Link
                    to={item.to}
                    className="flex items-center text-pink-600 hover:text-pink-700 font-medium transition-colors duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className="w-5 h-5 mr-2" />
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
