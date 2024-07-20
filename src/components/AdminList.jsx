import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axiosInstance from '../helper/axiosInstance';
import ConfirmationModal from '../modals/ConfirmationModal';

const AdminList = ({ handleSuperAdminStatus }) => {
  const [otherRegisteredAdmins, setOtherRegisteredAdmins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [modalMessage, setModalMessage] = useState('');

  const toggleAdminVerificationStatus = async (id) => {
    try {
      await axiosInstance.patch(`/toggle-verified/${id}`);
      setOtherRegisteredAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id === id ? { ...admin, verifiedAdmin: !admin.verifiedAdmin } : admin
        )
      );
    } catch (error) {
      console.error('Error toggling admin verified status:', error);
      throw error;
    }
  };

  useEffect(() => {
    const getAllAdminsExceptSelf = async () => {
      try {
        const response = await axiosInstance.get('/exclude-self');
        console.log(response.data.data);
        setOtherRegisteredAdmins(response.data.data)
      } catch (error) {
        console.error('Error fetching admins:', error);
        throw error;
      }
    };
    getAllAdminsExceptSelf()
  }, [])

  const handleToggleClick = (admin) => {
    setSelectedAdmin(admin)
    setModalMessage(`Are you sure you want to ${admin.verifiedAdmin ? 'unverify' : 'verify'} this admin?`);
    setIsModalOpen(true);
  }

  const handleConfirmToggle = () => {
    toggleAdminVerificationStatus(selectedAdmin._id);
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-6xl flex-grow bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-xl font-semibold text-gray-800">All Registered Admins</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white divide-y divide-gray-200 mt-4">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified Admin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Super Admin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {otherRegisteredAdmins.map((admin) => (
              <tr key={admin._id}>
                <td className="px-6 py-4 whitespace-nowrap">{admin.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{admin.fullName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{admin.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`flex items-center font-medium ${admin.verifiedAdmin ? 'text-green-500' : 'text-red-500'}`}>
                    {admin.verifiedAdmin ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
                    {admin.verifiedAdmin ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`flex items-center font-medium ${admin.isSuperAdmin ? 'text-green-500' : 'text-red-500'}`}>
                    {admin.isSuperAdmin ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
                    {admin.isSuperAdmin ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleClick(admin)}
                    className={`px-4 py-2 rounded text-white ${admin.verifiedAdmin ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} mr-2`}
                  >
                    {admin.verifiedAdmin ? 'Unverify' : 'Verify'}
                  </button>
                  {admin.isSuperAdmin ? (
                    <button
                      onClick={() => handleSuperAdminStatus(admin._id, false)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Remove Super Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSuperAdminStatus(admin._id, true)}
                      className="px-4 py-2 bg-[#2F89E3] text-white rounded hover:bg-[#297aca]"
                    >
                      Make Super Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmToggle}
        message={modalMessage}
      />
    </div>
  );
};

export default AdminList;
