import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
        <form className="bg-[#062719]/90 rounded-lg p-8 shadow-lg" onSubmit={handleSubmit}>
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
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <label className="block text-[#5AD1B1] mb-2" htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              className="w-full bg-[#041811] text-white rounded px-3 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-[#5AD1B1]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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
          Don't have an account? <Link to="/signup" className="underline hover:text-white">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginForm;
