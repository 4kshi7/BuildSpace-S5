import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Make sure to import axios
import useAuthCheck from "../../utils/checkAuth";
import { Loading } from "../Loader/Loading";
import MiniMusicControl from "../Music/MiniMusicControl";

export const Nav2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, isLoading } = useAuthCheck(); // Use the hook
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`,
        { withCredentials: true }
      );
      navigate("/login");
      window.location.reload(); // Force a reload to update auth state
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const menuItems = [
    "Home",
    "Profile",
    "Therapy",
    isLoggedIn ? "Logout" : "Login",
  ];
  const navItems = ["/", "/profile", "/chatbot", isLoggedIn ? "/" : "/login"];

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const menuItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
      },
    }),
  };

  const handleMenuItemClick = (index) => {
    if (menuItems[index] === "Logout") {
      handleLogout();
    } else {
      navigate(navItems[index]);
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-16 w-full flex items-center justify-between px-2 md:px-6 lg:px-10">
      <h1 className="text-transparent">LotusFocus</h1>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="z-50"
      >
        {isMenuOpen ? (
          <IoMdClose className="h-8 w-8 text-[#5AD1B1]" />
        ) : (
          <GiHamburgerMenu className="h-8 w-8 text-[#5AD1B1] bg-[#040F0C]" />
        )}
      </motion.button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 right-0 h-full w-64 bg-[#062719]/60 backdrop-blur-xl shadow-lg z-40"
          >
            <div className="flex flex-col h-full justify-center items-center">
              {menuItems.map((item, i) => (
                <motion.a
                  key={item}
                  onClick={() => handleMenuItemClick(i)}
                  custom={i}
                  variants={menuItemVariants}
                  className="text-[#5AD1B1] text-2xl font-semibold my-4 hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {item}
                </motion.a>
              ))}
              <MiniMusicControl />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
