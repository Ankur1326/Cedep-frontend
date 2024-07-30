import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUserPlus, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa'; // Import icons
import LogoutButton from './LogoutButton';
import ConfirmationModal from '../modals/ConfirmationModal';

const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAdmin(null);
    };
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const getLinkClass = (path) =>
        location.pathname === path
            ? 'block py-2 px-4 hover:bg-gray-700 rounded text-yellow-400 bg-gray-600'
            : 'block py-2 px-4 hover:bg-gray-700 rounded hover:text-yellow-400 transition-colors';

    return (
        <header className="bg-white border-2 border-b-gray-400 shadow-md text-black p-4 fixed w-full z-10 ">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl flex items-center font-bold">
                    <Link to="/">
                        <img src="/logo.png" alt="Logo" className="w-12 object-contain" />
                    </Link>
                    <span className="ml-3 text-xl md:text-xl font-bold text-yellow-400">Admin Panel</span>
                </div>
                <button
                    onClick={toggleMenu}
                    className="lg:hidden flex items-center"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
                <nav
                    className={`lg:flex lg:items-center lg:space-x-6 lg:bg-transparent bg-white ${isMenuOpen ? 'absolute top-16 right-0 w-50 block shadow-lg' : 'hidden'
                        }`}
                >
                    {/* <Link to="/" onClick={() => setIsMenuOpen(false)} className={getLinkClass('/')}>
                        Home
                    </Link> */}
                    <Link to="/invoice" onClick={() => setIsMenuOpen(false)} className={getLinkClass('/invoice')}>
                        <span className="">Invoice</span>
                    </Link>
                    <Link to="/students" onClick={() => setIsMenuOpen(false)} className={`${getLinkClass('/students')}`}>
                        <span className="">Students</span>
                    </Link>
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className={`flex items-center justify-center ${getLinkClass('/dashboard')}`}>
                        <FaTachometerAlt className="text-xl mr-2" />
                        <span className="">Dashboard</span>
                    </Link>
                    {/* Logout Button */}
                    <ConfirmationModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onConfirm={handleLogout}
                        message={`Are you sure you want to log out?`}
                    />
                    <div onClick={() => setIsModalOpen(true)} className="cursor-pointer flex items-center justify-center py-2 px-4 hover:bg-gray-700 rounded hover:text-yellow-400 transition-colors">
                        <span className="mr-2">Logout</span>
                        <FaSignOutAlt className="" />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
