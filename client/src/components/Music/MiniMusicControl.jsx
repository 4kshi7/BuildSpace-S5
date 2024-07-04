import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import { useStore } from './store';

const MiniMusicControl = () => {
  const { isPlaying, togglePlay } = useStore();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={togglePlay}
      className="bg-[#062719] text-[#5AD1B1] p-2 rounded-full"
    >
      {isPlaying ? <FaPause /> : <FaPlay />}
    </motion.button>
  );
};

export default MiniMusicControl;