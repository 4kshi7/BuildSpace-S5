import React, { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: 'user' }]);
      setInput('');
      setLoading(true);
      // Simulate bot response
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: 'Hello! How can I assist you today?', user: 'bot' }]);
        setLoading(false);
      }, 1000);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-white">
      <div className="w-1/4 p-0 bg-white shadow-xl rounded-2xl flex flex-col h-3/4 overflow-hidden">
        <div className="relative h-1/3 flex items-center p-0 bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1489648022186-8f49310909a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGluZXxlbnwwfHwwfHx8MA%3D%3D')` }}>
          <img
            src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y2hhdCUyMGJvdHxlbnwwfHwwfHx8MA%3D%3D"
            alt="ChatBot Avatar"
            className="w-16 h-16 rounded-full absolute top-40 left-10 border-2 border-white"
          />
          <div className="text-white absolute top-40 left-28">
            <div className="text-lg font-bold mt-1">ChatBot</div>
            <div className="flex items-center ">
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
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 focus:outline-none"
              onClick={handleSend}
            >
              Send
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
      `}</style>
    </div>
  );
};

export default ChatBot;
