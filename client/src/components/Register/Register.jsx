import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import TypingEffect from '../TypingEffect/TypingEffect'; // Assuming you have TypingEffect component

const RegisterForm = ({ history }) => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', {
        fullname,
        email,
        username,
        password,
      });
      console.log(response.data);
      toast.success('Registration successful! Redirecting to login page...', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Optionally, redirect or show a success message
      //   history.push('/login'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
      toast.error('Registration failed. Please try again.', {
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
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <TypingEffect />
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-blue-700 flex items-center justify-center">
        <div className="bg-blue-800 border-b-gray-100 border-1 text-white backdrop-blur-2xl rounded-xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-4">
            <img src="logo.png" alt="Logo" className="mx-auto mb-4" style={{ width: '150px' }} />
            <h2 className="text-xl font-bold">Create an Account</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="block w-full px-3 py-2 bg-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800"
              style={{ backdropFilter: 'blur(10px)' }}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 bg-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800"
              style={{ backdropFilter: 'blur(10px)' }}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Choose a Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-3 py-2 bg-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800"
              style={{ backdropFilter: 'blur(10px)' }}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Choose a Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 bg-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-800"
              style={{ backdropFilter: 'blur(10px)' }}
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </button>
          </form>
          <p className="text-sm text-gray-200 mt-4">
            Already have an account? <Link to="/login" className="text-blue-200">Login</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RegisterForm;
