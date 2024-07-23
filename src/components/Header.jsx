import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-950 p-4 w-[7cm] rounded-full shadow-lg">
      <nav className="flex justify-around items-center h-full">
        <Link
          to="/"
          className={`relative text-lg group transition-all duration-300 ease-in-out ${currentPath === '/' ? 'text-gray-700 font-bold' : 'text-white hover:text-blue-300'}`}
        >
          Home
          <span
            className={`absolute left-0 bottom-0 w-full h-[2px] bg-blue-300 transform ${currentPath === '/' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} transition-transform duration-300 ease-in-out`}
          ></span>
        </Link>
        <Link
          to="/searchboard"
          className={`relative text-lg group transition-all duration-300 ease-in-out ${currentPath === '/searchboard' ? 'text-gray-700 font-bold' : 'text-white hover:text-blue-300'}`}
        >
          Searchboard
          <span
            className={`absolute left-0 bottom-0 w-full h-[2px] bg-blue-300 transform ${currentPath === '/searchboard' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'} transition-transform duration-300 ease-in-out`}
          ></span>
        </Link>
      </nav>
    </header>
  );
}

export default Header;
