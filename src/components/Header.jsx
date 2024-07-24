import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import LogoutButton from './LogoutButton';
import ConfirmationModal from '../modals/ConfirmationModal';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAdmin(null);
    };
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <header className="bg-[#3B3F51] text-white shadow-md w-full">
            <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center">
                    <Link to="/" className="flex items-center">
                        <img src="/logo.png" alt="Logo" className="w-12 h-12 object-contain" />
                        <span className="ml-3 text-2xl font-bold text-yellow-400">Admin Panel</span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="flex space-x-11">
                    <div className='flex space-x-6'>
                        <Link to="/invoice" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors">
                            {/* <FaTachometerAlt className="text-xl mr-2" /> */}
                            <span className="font-medium">Invoice</span>
                        </Link>
                        <Link to="/student" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors">
                            <FaUserPlus className="text-xl mr-2" />
                            <span className="font-medium">Register Student</span>
                        </Link>
                        <Link to="/dashboard" className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors">
                            <FaTachometerAlt className="text-xl mr-2" />
                            <span className="font-medium">Dashboard</span>
                        </Link>
                    </div>

                    {/* log out btn      */}
                    <ConfirmationModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onConfirm={handleLogout}
                        message={`Are you sure you want Log out`}
                    />
                    <div onClick={() => setIsModalOpen(true)} className="cursor-pointer flex items-center text-gray-300 hover:text-yellow-400 transition-colors">
                        <span className="font-medium mr-2">Logout</span>
                        <FaSignOutAlt className="" />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
