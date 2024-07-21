import React, { useState } from 'react';
import { FaPaperPlane, FaCheck, FaEyeSlash, FaEye } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../helper/axiosInstance';
import ModalLoader from '../components/ModalLoader';

function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const handleSendOtpClick = async () => {
        try {
            setLoading(true)
            console.log(email);
            if (!email) {
                alert("Enter email to send otp")
                return;
            }
            const response = await axiosInstance.post('/send-otp', { email });
            if (response.status === 200) {
                setIsOtpSent(true);
                alert('OTP sent successfully');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Error sending OTP');
        } finally {
            setLoading(false)
        }
    };

    const handleVerifyOtpClick = async () => {
        try {
            if (!email || !otp) {
                alert('Please enter email and otp send otp');
                return;
            }
            const response = await axiosInstance.post('/verify-otp', { email, otp });
            if (response.status === 200) {
                setIsOtpVerified(true);
                alert('OTP verified successfully');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            // alert('Error verifying OTP');
        }
    };

    const handleRegisterClick = async (event) => {
        event.preventDefault();
        if (!isOtpVerified) {
            alert('Please verify the OTP before registering');
            return;
        }
        if (!fullName || !username || !email || !password || !confirmPassword) {
            alert('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            alert("Password and Confirm Password Not metched")
            return;
        }

        try {
            const response = await axiosInstance.post('/submit-admin-details', {
                fullName,
                username,
                email,
                password,
                confirmPassword,
            });
            if (response.status === 200) {
                alert('Registration successful');
                navigate('/login');
            }
        } catch (error) {
            console.error('Error registering admin:', error);
            alert('Error registering admin');
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {loading && <ModalLoader />}
            <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <div className="flex justify-center mb-3">
                    <img src="/logo.png" alt="Logo" className="w-24 h-16" />
                </div>
                <h2 className="text-3xl font-bold text-center text-gray-800">Register Admin</h2>
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="username" className="block text-start text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                                placeholder="Enter username"
                            />
                        </div>
                        <div>
                            <label htmlFor="fullName" className="block text-start text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                                placeholder="Enter full name"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-start text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="flex space-x-2">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                                placeholder="Enter email"
                            />
                            <button
                                type="button"
                                onClick={handleSendOtpClick}
                                aria-label="Send OTP"
                                className="flex items-center px-4 py-2 text-white bg-[#3699FF] rounded-md hover:bg-[#3088e0] focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <FaPaperPlane className="mr-2" />
                                Send
                            </button>

                        </div>
                    </div>
                    {/* otp field and verify btn */}
                    {
                        isOtpSent ? (
                            <div>
                                <label htmlFor="otp" className="block text-start text-sm font-medium text-gray-700">
                                    OTP
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        id="otp"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                                        placeholder="Enter OTP"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleVerifyOtpClick}
                                        aria-label="Verify OTP"
                                        className="flex items-center px-4 py-2 text-white bg-[#0BB7AF] rounded-md hover:bg-[#1d8580] focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-[#0BB7AF]"
                                    >
                                        <FaCheck className="mr-2" />
                                        Verify
                                    </button>
                                </div>
                            </div>
                        ) : ""
                    }

                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
                    {/* <div>
                            <label htmlFor="phone" className="block text-start text-sm font-medium text-gray-700">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                id="phone"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                                placeholder="Enter phone number"
                            />
                        </div> */}
                    {/* <div>
                        <label htmlFor="address" className="block text-start text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                            placeholder="Enter address"
                        />
                    </div> */}
                    {/* </div> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        <div className="relative">
                            <label htmlFor="confirmPassword" className="block text-start text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                                placeholder="Confirm password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-500"
                                aria-label="Toggle password visibility"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        onClick={handleRegisterClick}
                        className="w-full px-4 py-2 text-white rounded-md bg-[#3699FF] hover:bg-[#2f89e3] focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-[#2f89e3]"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        If already registered, <button
                            onClick={() => navigate('/login')}
                            className="text-blue-600 hover:underline focus:outline-none"
                        >
                            go to login page
                        </button>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
