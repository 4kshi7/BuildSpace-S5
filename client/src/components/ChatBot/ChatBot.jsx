import React, { useState } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: 'user' }]);
      setInput('');
      // Simulate bot response
      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: 'Hello! How can I assist you today?', user: 'bot' }]);
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-4 bg-white shadow-lg rounded-lg flex">
        {/* Left Part */}
        <div className="w-full h-1/3 bg-black flex flex-col items-center justify-center relative">
          {/* Image */}
          <img 
            src="https://plus.unsplash.com/premium_photo-1677094310899-02303289cadf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cm9ib3R8ZW58MHx8MHx8fDA%3D"
            alt="ChatBot Avatar"
            className="w-24 h-24 rounded-full absolute top-24 left-4"
          />
          {/* Green Circle */}
          <div className="bg-green-500 w-4 h-4 rounded-full absolute -bottom-2 left-10"></div>
          {/* Online Indicator */}
          <div className="text-xs text-gray-600 absolute -bottom-4 left-16">Online</div>
        </div>
        
        {/* Right Part */}
        <div className="w-2/3 flex flex-col">
          {/* Chat Header */}
          <div className="text-lg font-bold mb-4">ChatBot</div>
          {/* Chat Messages */}
          <div className="flex flex-col h-96 overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.user === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-4 py-2 rounded-lg mb-2 ${message.user === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          {/* Message Input */}
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
