import React from 'react'
import { motion } from "framer-motion";

const MusicPlayer = () => {
  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.9, duration: 0.5 }}
    className="px-4 mb-8"
  >
    <button className="w-full bg-[#062719] text-white py-3 rounded-full border border-[#5AD1B1] text-sm sm:text-base hover:bg-[#0a3b25] transition-colors duration-300">
      Music Player
    </button>
  </motion.div>
  )
}

export default MusicPlayer
