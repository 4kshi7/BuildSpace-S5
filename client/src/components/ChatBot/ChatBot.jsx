import React, { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [inactiveTimeout, setInactiveTimeout] = useState(null);
  const [closingTimeout, setClosingTimeout] = useState(null);
  const [chatClosed, setChatClosed] = useState(false);
  const messagesEndRef = useRef(null);

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
  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: 'user' }]);
      setInput('');
      setLoading(true);
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: 'Hello! How can I assist you today?', user: 'bot' }]);
        setLoading(false);
        resetInactiveTimeout();
      }, 1000);
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
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <div className="w-full max-w-lg md:max-w-lg p-0 bg-white shadow-2xl rounded-2xl flex flex-col h-3/4 overflow-hidden">
        <div className="relative h-1/3 flex items-center p-0 bg-cover" style={{ backgroundImage: `url('https://t3.ftcdn.net/jpg/03/29/74/14/360_F_329741445_UqQs5EilomwBp9Lr9RKV9ZlGIpC2S94n.jpg')` }}>
          <img
            src="https://img.freepik.com/premium-photo/robot-wallpapers-that-are-out-this-world_821898-1100.jpg?w=360"
            alt="ChatBot Avatar"
            className="w-16 h-16 rounded-full absolute top-40 left-10 border-2 border-white object-fill"
          />
          <div className="text-white absolute top-40 left-28">
            <div className="text-lg font-bold mt-1">ChatBot</div>
            <div className="flex items-center">
              <div className="bg-green-500 w-3 h-3 rounded-full mr-2"></div>
              <div className="text-xs font-semibold">Online</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col h-2/3 flex-grow p-4 bg-gray-100">
          <div className="flex flex-col flex-grow overflow-y-auto mb-4 custom-scroll">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.user === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 rounded-lg mb-2 ${message.user === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                  {message.text}
                </div>
              </div>
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
              className="flex-1 px-4 py-2 w-3/5 bg-transparent border-b-2 border-b-slate-300 shadow-b-md shadow-neutral-900 focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={chatClosed}
            />
            <button
              className={`ml-2 px-4 py-2 ${chatClosed ? 'bg-green-500' : 'bg-blue-500'} text-white rounded-2xl ${chatClosed ? 'hover:bg-green-600 ' : 'hover:bg-blue-600 '} focus:outline-none`}
              onClick={handleButtonClick}
            >
              {chatClosed ? 'Start Again' : 'Send'}
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .loader {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .loader span {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin: 0 2px;
          background-color: #333;
          border-radius: 50%;
          animation: loader 0.8s infinite alternate;
        }
        .loader span:nth-child(2) {
          animation-delay: 0.2s;
        }
        .loader span:nth-child(3) {
          animation-delay: 0.4s;
        }
        @keyframes loader {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-8px);
          }
        }
        .custom-scroll::-webkit-scrollbar {
          display: none;
        }
        .custom-scroll {
          -ms-overflow-style: none;  /* Internet Explorer 10+ */
          scrollbar-width: none;  /* Firefox */
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

export default ChatBot;
