import React from 'react'
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Card = ({ title, icon, index, description, link, disabled }) => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 * index, duration: 0.3 }}
        className={`bg-[#062719]/20 rounded-xl p-6 flex flex-col items-start justify-between aspect-[4/5] relative overflow-hidden group hover:bg-[#062719]/40 transition-colors duration-300 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <motion.span
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.2 }}
          className="text-[#5AD1B1] text-3xl mb-4"
        >
          {icon}
        </motion.span>
        <div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 * index, duration: 0.3 }}
            className="text-base sm:text-lg font-semibold mb-2"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 * index, duration: 0.3 }}
            className="text-xs md:text-sm text-gray-300 mb-4"
          >
            {description}
          </motion.p>
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 * index, duration: 0.3 }}
          className="w-full"
        >
          <Link to={link}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full bg-[#0b4334] text-[#fff] py-2 rounded-full text-xs md:text-sm font-semibold transition-colors duration-300 ${
                disabled ? "bg-[#06241c] cursor-not-allowed" : "hover:bg-[#4BC0A0]"
              }`}
              disabled={disabled}
            >
              {disabled ? "Coming Soon" : `Explore ${title}`}
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    );
  };
  
  
  
  
  
export default Card
