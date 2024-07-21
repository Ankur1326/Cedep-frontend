import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#8E9BAE] text-white rounded-md hover:bg-[#788392] transition-colors flex items-center"
        >
            <FaSignOutAlt className="mr-2" />
            Logout
        </button>
    );
};

export default LogoutButton;
