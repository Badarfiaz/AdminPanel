'use client'

import React, { useState, useEffect } from 'react';
import { TextField, Button, InputAdornment, ThemeProvider, createTheme, CircularProgress } from '@mui/material';
import { Mail, Lock, LogIn, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0',
    },
    secondary: {
      main: '#e91e63',
    },
  },
});

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    
    setLoading(true);

    const validEmail = 'BadarFiaz@gmail.com';
    const validPassword = 'Meow';

    setTimeout(() => {
      if (email === validEmail && password === validPassword) {
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        setErrorMessage('');
        alert('Login successful!');
      } else {
        setErrorMessage('Invalid credentials, please try again.');
        alert('Invalid credentials, please try again.');
      }

      setLoading(false);
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    alert('Logged out successfully');
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <motion.div
          className="bg-white p-8 rounded-lg shadow-2xl w-96 z-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isLoggedIn ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold mb-6 text-purple-700">
                User : Badar Fiaz 
              </h2>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                size="large"
                startIcon={<LogOut />}
                onClick={handleLogout}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
              >
                Logout
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-center mb-6 text-purple-700">
 Admin only
               </h2>
              <form onSubmit={handleLogin} className="space-y-6">
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail className="text-purple-400" size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock className="text-purple-400" size={20} />
                      </InputAdornment>
                    ),
                  }}
                />
                {errorMessage && (
                  <p className="text-red-500 text-sm text-center">
                    {errorMessage}
                  </p>
                )}
                {loading ? (
                  <div className="text-center">
                    <CircularProgress size={24} />
                  </div>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    startIcon={<LogIn />}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                  >
                    Login
                  </Button>
                )}
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="#" className="text-purple-600 hover:text-purple-800 transition-colors duration-300">
                  Sign up
                </a>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </ThemeProvider>
  );
}

