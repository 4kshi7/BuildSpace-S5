import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import vinylImage from "./vinyl.png";
import { useStore } from "./store";
import { Nav2 } from "../Navbar/Nav2";

const MusicPlayer = () => {
  const audioRef = useRef(null);
  const { isPlaying, togglePlay } = useStore();

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="flex flex-col items-center  w-screen h-screen bg-gradient-to-br from-customGreen to-customBlack ">
      <Nav2 />
      <audio
        ref={audioRef}
        src="https://fluxfm.streamabc.net/flx-chillhop-mp3-128-8581707?sABC=6686r6n0%230%236o0ss9q4o6o5o4920p98s838o4r6on9n%23fgernzf.syhksz.qr&aw_0_1st.playerid=streams.fluxfm.de&amsparams=playerid:streams.fluxfm.de;skey:1720116896"
      />
      <div className="flex justify-center w-full h-screen items-center">
        <div className="flex flex-col">
          <motion.img
            src={vinylImage}
            alt="Vinyl"
            className="w-64 h-64 mb-6"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="bg-[#5AD1B1] text-[#062719] px-6 py-2 rounded-full font-semibold text-lg hover:bg-[#4BC0A0] transition-colors duration-300"
          >
            {isPlaying ? "Pause" : "Play"}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
