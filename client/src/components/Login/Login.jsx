import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import usePasswordToggle from '../../hooks/usePasswordToggle';
import "../../style/commonstyle.css"

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordType, toggleIcon] = usePasswordToggle();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    axios.defaults.withCredentials = true;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/signin`,
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.message === 'Logged in successfully') {
        navigate('/'); // Redirect to dashboard or home page
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 'An error occurred. Please try again.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-customGreen to-customBlack flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h2 className="text-4xl font-bold text-center text-[#5AD1B1] mb-8">
          <span className="italic">Lotus</span>Focus
        </h2>
        <form
          className="bg-[#062719]/90 rounded-lg p-8 shadow-lg"
          onSubmit={handleSubmit}
        >
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <label className="block text-[#5AD1B1] mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full bg-[#041811] text-white rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#5AD1B1]"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label className="block text-[#5AD1B1] mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordType}
                id="password"
                className="w-full bg-[#041811] text-white rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#5AD1B1]"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute right-3 top-3 cursor-pointer" style={{ color: '#5AD1B1' }}>
                {toggleIcon}
              </span>
            </div>
          </motion.div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#5AD1B1] text-[#041811] font-bold py-2 rounded hover:bg-[#4BC0A0] transition duration-300"
          >
            Log In
          </motion.button>
        </form>
        <p className="text-center text-[#5AD1B1] mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="underline hover:text-white">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginForm;
