import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaTachometerAlt } from 'react-icons/fa'; // Import icons

const Header = () => {
    return (
        <header className="bg-[#3B3F51] text-white shadow-md w-full">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
                        <span className="ml-3 text-2xl font-bold text-yellow-400">Admin Panel</span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex space-x-6">
                    <Link to="/dashboard" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors">
                        <FaTachometerAlt className="text-xl mr-2" />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link to="/student" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors">
                        <FaUserPlus className="text-xl mr-2" />
                        <span className="font-medium">Register Student</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
