import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = ({ isAuthenticated, userName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const menuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleGetPlanClick = () => 
      {
        if (!isAuthenticated) {
            if (location.pathname === '/login' || location.pathname === '/register') {
                toast.error('Please login/register first', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error('Please login/register to get the plan', {
                    position: 'bottom-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }
    };

    return (
        <nav className="bg-gray-100 p-4 relative flex items-center justify-between">
            <div className="flex items-center">
                <Link to="/" className="flex items-center ml-4 text-blue-500">
                    <img src="logo.png" alt="Leaves" className="h-12 w-auto mr-4" />
                    <h2 className="text-4xl font-bold text-black">LOTUSFOCUS</h2>
                </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8 ml-auto">
                <NavLink
                    to="/"
                    exact
                    className="text-xl font-semibold focus:outline-none hover:text-blue-600"
                    activeClassName="text-blue-600"
                >
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    className="text-xl font-semibold focus:outline-none hover:text-blue-600"
                    activeClassName="text-blue-600"
                >
                    About Us
                </NavLink>
                <button
                    onClick={handleGetPlanClick}
                    className="text-xl font-semibold focus:outline-none hover:text-blue-600"
                >
                    Get Plan
                </button>
                {!isAuthenticated && location.pathname === '/' && (
                    <Link
                        to="/register"
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-lg font-semibold"
                    >
                        Join
                    </Link>
                )}
                {isAuthenticated && (
                    <div className="flex items-center space-x-4 ml-auto">
                        <button
                            onClick={() => alert('Logging out...')}
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-lg font-semibold"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
            <div className="md:hidden flex items-center ml-auto">
                <button onClick={() => setIsOpen(!isOpen)} className="text-3xl focus:outline-none">
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            {isOpen && (
                <div ref={menuRef} className="absolute top-full left-0 w-full bg-gray-100 flex flex-col items-end p-4 space-y-4 md:hidden z-50">
                    <NavLink
                        to="/"
                        exact
                        className="text-xl font-semibold focus:outline-none hover:text-blue-600"
                        activeClassName="text-blue-600"
                        onClick={() => setIsOpen(false)}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className="text-xl font-semibold focus:outline-none hover:text-blue-600"
                        activeClassName="text-blue-600"
                        onClick={() => setIsOpen(false)}
                    >
                        About Us
                    </NavLink>
                    <button
                        onClick={() => {
                            handleGetPlanClick();
                        }}
                        className="text-xl font-semibold focus:outline-none hover:text-blue-600"
                    >
                        Get 
                    </button>
                    {!isAuthenticated && location.pathname === '/' && (
                        <Link
                            to="/register"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-lg font-semibold"
                            onClick={() => setIsOpen(false)}
                        >
                            Join
                        </Link>
                    )}
                    {isAuthenticated && (
                        <div className="flex flex-col items-center space-y-4">
                            <p className="text-xl font-semibold">Welcome, {userName}</p>
                            <button
                                onClick={() => {
                                    alert('Logging out...');
                                    setIsOpen(false);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-lg font-semibold"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
            <ToastContainer />
        </nav>
    );
};

export default Navbar;
