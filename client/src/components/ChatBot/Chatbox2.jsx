import React, { useState, useEffect, useRef } from 'react';
import {motion} from "framer-motion"
import axios from 'axios';

const ChatBot2 = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [inactiveTimeout, setInactiveTimeout] = useState(null);
  const [closingTimeout, setClosingTimeout] = useState(null);
  const [chatClosed, setChatClosed] = useState(false);
  const messagesEndRef = useRef(null);

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Your backend base URL
    withCredentials: true, // This is important for sending cookies
  });


  // Function to send bot messages
  const sendBotMessage = (text) => {
    setMessages(prevMessages => [...prevMessages, { text, user: 'bot' }]);
  };

  // Send welcome message when the component mounts
  useEffect(() => {
    if (messages.length === 0) {
      sendBotMessage('Welcome to the chat! How can I assist you today?');
      resetInactiveTimeout();
    }
  }, []); // Empty dependency array ensures this runs only once

  // Function to reset inactivity timeout
  const resetInactiveTimeout = () => {
    clearTimeout(inactiveTimeout);
    clearTimeout(closingTimeout);
    setInactiveTimeout(setTimeout(() => {
      sendBotMessage('It seems like you are inactive. Do you want to close the chat?');
      setClosingTimeout(setTimeout(() => {
        closeChat();
      }, 120000)); // 2 minutes to auto-close
    }, 120000)); // 2 minutes of inactivity
  };

  // Function to close the chat
  const closeChat = () => {
    setChatClosed(true);
    sendBotMessage('The chat has been closed. Click "Start Again" to continue.');
  };

  // Handle sending user messages
  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: 'user' }]);
      setInput('');
      setLoading(true);

      try {
        const response = await axiosInstance.post('/api/v1/bot/chat', { userInput: input });
        setMessages(prevMessages => [...prevMessages, { text: response.data.message, user: 'bot' }]);
      } catch (error) {
        console.error('Error:', error);
        let errorMessage = 'Error: Unable to fetch response from server';
        if (error.response && error.response.data && error.response.data.error) {
          errorMessage = `Error: ${error.response.data.error}`;
        }
        setMessages(prevMessages => [...prevMessages, { text: errorMessage, user: 'bot' }]);
      }

      setLoading(false);
      resetInactiveTimeout();
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle Enter key press to send message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  // Handle button click
  const handleButtonClick = () => {
    if (chatClosed) {
      // Restart the chat
      setMessages([]);
      setChatClosed(false);
      sendBotMessage('Welcome to the chat! How can I assist you today?');
      resetInactiveTimeout();
    } else {
      handleSend();
    }
  };

  // Scroll to the bottom of the chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gradient-to-br from-customGreen to-customBlack">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg md:max-w-lg p-0 bg-[#062719]/20 shadow-2xl rounded-2xl flex flex-col h-3/4 overflow-hidden"
      >
        <div className="relative h-1/4 flex items-center p-0 bg-[#062719]">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            src="https://img.freepik.com/premium-photo/robot-wallpapers-that-are-out-this-world_821898-1100.jpg?w=360"
            alt="ChatBot Avatar"
            className="w-16 h-16 rounded-full absolute -bottom-8 left-10 border-2 border-[#5AD1B1] object-fill"
          />
          <div className="text-[#5AD1B1] absolute bottom-2 left-28">
            <div className="text-lg font-bold">LotusBot</div>
            <div className="flex items-center">
              <div className="bg-[#5AD1B1] w-3 h-3 rounded-full mr-2"></div>
              <div className="text-xs font-semibold">Online</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-3/4 flex-grow p-4 bg-[#041811]/50">
          <div className="flex flex-col flex-grow overflow-y-auto mb-4 custom-scroll">
            {messages.map((message, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex ${message.user === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`px-4 py-2 rounded-lg mb-2 ${message.user === 'user' ? 'bg-[#5AD1B1] text-[#041811]' : 'bg-[#062719] text-[#5AD1B1]'}`}>
                  {message.text}
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex justify-start mb-2">
                <div className="loader">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 px-4 py-2 w-3/5 bg-transparent border-b-2 border-b-[#5AD1B1] text-[#5AD1B1] focus:outline-none placeholder-[#5AD1B1]/50"
              placeholder="Type a message..."
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={chatClosed}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`ml-2 px-4 py-2 ${chatClosed ? 'bg-[#5AD1B1]' : 'bg-[#5AD1B1]'} text-[#041811] rounded-full focus:outline-none`}
              onClick={handleButtonClick}
            >
              {chatClosed ? 'Start Again' : 'Send'}
            </motion.button>
          </div>
        </div>
      </motion.div>
      <style jsx>{`
        .loader span {
          background-color: #5AD1B1;
        }
        .custom-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background-color: #5AD1B1;
          border-radius: 3px;
        }
        .custom-scroll {
          scrollbar-width: thin;
          scrollbar-color: #5AD1B1 transparent;
        }
        @media (max-width: 768px) {
          .w-full {
            width: 100%;
          }
          .max-w-lg {
            max-width: 95%;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatBot2;
