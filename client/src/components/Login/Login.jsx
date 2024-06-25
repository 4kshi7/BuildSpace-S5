import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import TypingEffect from '../TypingEffect/TypingEffect'; // Assuming you have TypingEffect component

const LoginForm = ({ history }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      });
      console.log(response.data);
      toast.success('Login successful! Redirecting...', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Optionally, redirect or show a success message
      // history.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Login failed. Please try again.', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="flex h-screen  p-5 md:p-0 m-0 flex-col  md:flex md:flex-row">
      {/* Left Side */}
      <div className=" sm:w-full sm:h-48 mb-10 md:mt-72 md:w-2/5 bg-white flex items-center justify-center">
        <TypingEffect />
      </div>

      {/* Right Side */}
      <div className=" sm:w-full p-10  md:p-0  md:w-3/5 md:flex items-center justify-center bg-blue-700">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg  rounded-xl shadow-blue-800 shadow-opacity-5 p-8 max-w-md w-full shadow-md text-white">
          <div className="text-center mb-4">
            <img src="logo.png" alt="LotusFocus" className="mx-auto mb-4" style={{ width: '150px' }} />
            <h2 className="text-xl font-bold">Login to Your Account</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="username" className="text-white mb-2">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-3 py-2 bg-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                style={{ backdropFilter: 'blur(10px)' }}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-white mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 bg-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                style={{ backdropFilter: 'blur(10px)' }}
                required
              />
            </div>
            <p className="text-sm text-gray-200 mt-4">
            <Link to="/forgot-password" className="text-blue-200">Forgot Password?</Link>
          </p>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
          
          <p className="text-sm text-gray-200 mt-4">
            Don't have an account? <Link to="/register" className="text-blue-200">Register</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
