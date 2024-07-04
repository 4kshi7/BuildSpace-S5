import React from "react";
import { motion } from "framer-motion";
import { Nav2 } from "../Navbar/Nav2";
import { Link } from "react-router-dom";

const Home = () => {
  const cards = [
    { 
      title: "Therapy", 
      icon: "🧠", 
      description: "Access professional mental health support and resources.",
      link: "/chatbot"
    },
    { 
      title: "Pomodoro", 
      icon: "⏱️", 
      description: "Boost productivity with our customizable Pomodoro timer.",
      link: "/pomodoro"
    },
    { 
      title: "Journal", 
      icon: "📓", 
      description: "Track your thoughts and emotions with our digital journal.",
      link: "/journals"
    },
    { 
      title: "Community", 
      icon: "👥", 
      description: "Connect with like-minded individuals for support and growth.",
      link: "/posts"
    },
    { 
      title: "Music", 
      icon: "🎵", 
      description: "Discover focus-enhancing playlists and ambient sounds.",
      link: "/music"
    },
    { 
      title: "Health", 
      icon: "💪", 
      description: "Access resources for physical and mental well-being.",
      link: "/health"
    },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-customGreen to-customBlack text-white">
      <Nav2 />
      <div className="container mx-auto lg:px-36 md:px-8 px-4 pt-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex justify-center items-center mb-12"
        >
          <h1 className="text-[#5AD1B1] font-bold text-4xl sm:text-5xl">
            <span className="italic font-semibold">Lotus</span>Focus
          </h1>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cards.map((card, index) => (
            <Card 
              key={index} 
              title={card.title} 
              icon={card.icon} 
              description={card.description}
              link={card.link}
              index={index} 
            />
          ))}
        </div>
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-12"
        >
          <p className="text-xs sm:text-sm text-gray-400 text-center max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet consectetur. Eget nibh aliquet mattis in quam rhoncus porta diam
            sagittis. Sit sed molestie viverra ut. Et feugiat tempor nunc suspendisse neque lacus nibh
            egestas tempus. Feugiat tincidunt vitae bibendum ipsum amet laoreet vel. Rhoncus feugiat
            accumsan aenean quisque.
          </p>
        </motion.div> */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-12"
        >
          <div className="bg-[#062719] h-40 sm:h-56 rounded-lg"></div>
        </motion.div> */}
        <MusicPlayer />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

const Card = ({ title, icon, index, description, link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 * index, duration: 0.3 }}
      className="bg-[#062719]/20 rounded-xl p-6 flex flex-col items-start justify-between aspect-[4/5] relative overflow-hidden group hover:bg-[#062719]/40 transition-colors duration-300"
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
            className="w-full bg-[#0b4334] text-[#fff] py-2 rounded-full text-xs md:text-sm font-semibold hover:bg-[#4BC0A0] transition-colors duration-300"
          >
            Explore {title}
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

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
  );
};

const Footer = () => {
  return (
    <footer className=" py-6 text-xs text-gray-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
          <div>
            <p className="font-semibold mb-1">Our Socials:</p>
            <p>@akshit.fts</p>
            <p>@h4rshitr</p>
            <p>@tarun185</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Created By</p>
            <p>Akshit</p>
            <p>Harshit</p>
            <p>Tarun</p>
          </div>
          <div>
            <p className="font-semibold mb-1">Presenting</p>
            <p>LotusFocus</p>
            <p>2024</p>
            <p>All rights reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};