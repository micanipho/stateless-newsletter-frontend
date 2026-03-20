import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center max-w-4xl">
        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-100 transition-colors">
          Stateless Newsletter
        </Link>
        <div className="space-x-4">
          <Link
            to="/"
            className="text-white hover:text-blue-200 transition-colors px-3 py-2 rounded-md hover:bg-blue-700"
          >
            Home
          </Link>
          <Link
            to="/subscribe"
            className="bg-white text-blue-700 px-4 py-2 rounded-md shadow-sm hover:bg-gray-100 transition-colors"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;