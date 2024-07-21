// DashboardPage.js
import React, { useEffect, useState } from 'react';
import { FaEdit, FaCheckCircle, FaTimesCircle, FaSignOutAlt } from 'react-icons/fa';
import AdminList from '../components/AdminList';
import axiosInstance from '../helper/axiosInstance';
import LogoutButton from '../components/LogoutButton';
import Loader from '../components/Loader';

function DashboardPage() {
  const [admin, setAdmin] = useState({})
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleFetchCurrentAdmin = async () => {
    try {
      const response = await axiosInstance.get('/current-admin');
      setAdmin(response.data.data);
    } catch (error) {
      setError('Failed to fetch admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchCurrentAdmin()
  }, [])

  // Handle loading state
  if (loading) {
    return <Loader />;
  }

  // Handle error state
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* My Profile */}
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
          <LogoutButton />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-center space-x-5 p-4 bg-gray-100 rounded-lg shadow-sm">
            <label className="block text-gray-600 font-semibold">Username:</label>
            <span className="text-gray-800 font-medium">{admin?.username}</span>
          </div>
          <div className="flex items-center justify-center space-x-5 p-4 bg-gray-100 rounded-lg shadow-sm">
            <label className="block text-gray-600 font-semibold">Full Name:</label>
            <span className="text-gray-800 font-medium">{admin?.fullName}</span>
          </div>
          <div className="flex items-center justify-center space-x-5 p-4 bg-gray-100 rounded-lg shadow-sm">
            <label className="block text-gray-600 font-semibold">Email:</label>
            <span className="text-gray-800 font-medium">{admin?.email}</span>
          </div>
          <div className="flex items-center justify-center space-x-5 p-4 bg-gray-100 rounded-lg shadow-sm">
            <label className="block text-gray-600 font-semibold">Are you a Super Admin? :</label>
            <span className={`flex items-center font-medium ${admin?.isSuperAdmin ? 'text-green-500' : 'text-red-500'}`}>
              {admin?.isSuperAdmin ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
              {admin?.isSuperAdmin ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex items-center justify-center space-x-5 p-4 bg-gray-100 rounded-lg shadow-sm">
            <label className="block text-gray-600 font-semibold">Verified Admin:</label>
            <span className={`flex items-center font-medium ${admin?.verifiedAdmin ? 'text-green-500' : 'text-red-500'}`}>
              {admin?.verifiedAdmin ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
              {admin?.verifiedAdmin ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-[#32C5D2] text-white rounded-md hover:bg-[#28a0ab] transition-colors flex items-center">
            <FaEdit className="mr-2" />
            Edit
          </button>
        </div>
      </div>

      {/* Render AdminList only if the user is a Super Admin */}
      {admin.isSuperAdmin ? (
        <AdminList />
      )
        : ""
      }
    </div>
  );
}

export default DashboardPage;
