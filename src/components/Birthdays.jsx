import React, { useState } from 'react';
import MyImage from '../bd.png';
import Image from '../pt.png';

const Birthdays = () => {
  const [clicked, setClicked] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: Date.now(),
        text: newMessage,
        timestamp: new Date().toLocaleDateString()
      }]);
      setNewMessage('');
      setClicked(true);
      setTimeout(() => setClicked(false), 1000);
    }
  };

  return (
    <div className="font-['Poppins',sans-serif] p-10 ml-[14px] box-border">
      <div className="flex justify-between items-center mb-[30px] relative">
        <h2 className="text-2xl font-semibold ml-5">UPCOMING BIRTHDAYS</h2>
      </div>

      <div className="relative">
        <img 
          src={Image} 
          className="absolute right-0 -top-[170px] text-[70px] -z-10 opacity-90"
        />        
        
        <div className="flex flex-wrap gap-[30px] justify-between w-full">
          {messages.length === 0 ? (
            <div className="bg-white flex-[30%] p-5 rounded-[15px] box-border shadow-[0px_4px_10px_rgba(0,0,0,0.1)]">
              <h3 className="text-lg font-semibold mb-2.5">No messages yet</h3>
              <p className="text-sm text-[#555] leading-normal">Be the first to wish someone a happy birthday!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className="bg-white flex-[30%] p-5 rounded-[15px] box-border shadow-[0px_4px_10px_rgba(0,0,0,0.1)]">
                <h3 className="text-lg font-semibold mb-2.5">Birthday Wish</h3>
                <p className="text-sm text-[#555] leading-normal">{message.text}</p>
                <p className="text-xs text-[#888] mt-2.5 leading-normal">
                  Posted on: {message.timestamp}
                </p>
              </div>
            ))
          )}
        </div>
        <img
          src={MyImage}
          alt="Gift"
          className="absolute top-[250px] -left-[112px] w-[120px] -z-10 opacity-90 -translate-y-[20%] ml-[15px] mb-[90px]"
        />
      
        <form 
          onSubmit={handleSubmit}
          className="mt-[5px] relative font-['Poppins',sans-serif]"
        >
          <input
            type='text' 
            placeholder='Birthday wishes to the born baby' 
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-[70%] h-[50px] text-2xl font-medium font-['Poppins',sans-serif] border-none border-l-3 border-[#d3d3d3] outline-none px-5 py-2.5 mx-auto my-[150px] block text-[#333] bg-white"
          />

          <button
            type="submit"
            className={`absolute right-5 top-[100px] w-[200px] h-[50px] rounded-[40px] cursor-pointer text-xl transition-all duration-300 ease-in-out border border-[#2aa2ff] ${
              clicked ? 'bg-[#2aa2ff] text-white' : 'bg-white text-[#2aa2ff]'
            }`}
          >
            POST
          </button>
        </form>
      </div>
    </div>
  );
};

export default Birthdays;
