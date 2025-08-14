import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ onMenuClick }) => {
  return (
    <nav className="bg-white shadow-md px-4 py-3 flex justify-between items-center md:px-6">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center space-x-4">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={onMenuClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Logo */}
        <Link to="/admin/dashboard" className="text-2xl font-bold text-blue-600">
          EmployeeManager
        </Link>
      </div>

      {/* Right: Links */}
      <div className="space-x-4 hidden md:flex">
        <Link to="/admin/profile" className="text-gray-700 hover:text-blue-600">
          Profile
        </Link>
        <Link to="/logout" className="text-gray-700 hover:text-red-500">
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
