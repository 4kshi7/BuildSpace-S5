import React from "react";
import { motion } from "framer-motion";
import { Nav2 } from "../Navbar/Nav2";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Card from "../Card/Card";

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
      link: "/health",
      disabled: true
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {cards.map((card, index) => (
            <Card 
              key={index} 
              title={card.title} 
              icon={card.icon} 
              description={card.description}
              link={card.link}
              index={index}
              disabled={card.disabled || false} // Pass disabled prop
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

