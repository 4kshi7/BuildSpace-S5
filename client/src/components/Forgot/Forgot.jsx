import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';

const Forgot = () => {
  const [email, setEmail] = useState('');
 

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5000/api', {
        email
      }, {
        withCredentials: true
      });
      
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
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
          <span className="">FORGOT PASSWORD</span>
        </h2>
        <form className="bg-[#062719]/20 rounded-lg p-8 shadow-lg" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <label className="block text-[#5AD1B1] mb-2" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              className="w-full bg-[#041811] text-white rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#5AD1B1]"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>
         
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-[#5AD1B1] text-[#041811] font-bold py-2 rounded hover:bg-[#4BC0A0] transition duration-300"
          >
            Request Password Reset
          </motion.button>
        </form>
        
      </motion.div>
    </div>
  );
};

export default Forgot;