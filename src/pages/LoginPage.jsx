import React, { useContext, useState } from 'react';
import { FaEyeSlash, FaEye } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../helper/axiosInstance';
import { UserType } from '../context/UserContext';
import ModalLoader from '../components/ModalLoader';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = async () => {
    setLoading(true)
    try {
      const response = await axiosInstance.post('/login', {
        identifier: email,
        password: password,
      });

      // console.log("response.data : ", response.data);
      localStorage.setItem('accessToken', JSON.stringify(response.data.data.accessToken));

      // Navigate to the admin dashboard or another protected route
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {loading && <ModalLoader />}
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-3">
          <img src="/logo.png" alt="Logo" className="w-24 h-16" />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLoginClick(); }}>
          <div>
            <label htmlFor="email" className="block text-start text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
              placeholder="Enter email"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-start text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-500"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white rounded-md bg-[#3699FF] hover:bg-[#2f89e3] focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-[#2f89e3]"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            If not registered, <button
              onClick={() => navigate('/register')}
              className="text-blue-600 hover:underline focus:outline-none"
            >
              go to registration page
            </button>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
