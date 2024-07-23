import React, { useContext, useState } from 'react';
import UserIdContext from './UserIdContext';
import cflogo from '../assets/cflogo.webp';
import { FaLinkedin } from "react-icons/fa6";

function Card() {
  const { setUserId } = useContext(UserIdContext);
  const [username, setUsername] = useState('');

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  const handleGetInfo = () => {
    console.log(`Get info for username: ${username}`);
    setUserId(username);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setUserId(username); 
    }
  };

  return (
    <>
      <div className="flex justify-center items-center lg:m-0 m-5">
        <div className="w-80 min-w-[9cm] p-8 bg-white rounded-lg border-2 border-gray-500 shadow-xl shadow-gray-900 hover:shadow-gray-950">
          <img src={cflogo} alt="Codeforces Logo" className="w-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-center">Codeforces CheatDetector</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter CF ID"
              value={username}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border-2 border-gray-800 rounded-md focus:outline-none"
            />
          </div>
          <button
            onClick={handleGetInfo}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none"
          >
            Get Info
          </button>
        </div>
      </div>

      <div className="fixed top-0 right-0 p-4">
        <button className="relative bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full flex items-center justify-center">
          <a href='https://www.linkedin.com/in/kunal-bodke-b29663252' className="text-white">
            <FaLinkedin />
          </a>
        </button>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm">
          Made by 
          <a 
            href="https://www.linkedin.com/in/kunal-bodke-b29663252" 
            className="text-blue-500 hover:underline ml-1"
          >
            Kunal Bodke
          </a>
        </p>
      </div>
    </>
  );
}

export default Card;
