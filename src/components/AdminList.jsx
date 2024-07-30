import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import axiosInstance from '../helper/axiosInstance';
import ConfirmationModal from '../modals/ConfirmationModal';
import { toast } from 'react-toastify';
import Button from './Button';

const AdminList = () => {
  const [otherRegisteredAdmins, setOtherRegisteredAdmins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [modalMessage, setModalMessage] = useState('');
  const [action, setAction] = useState('');

  useEffect(() => {
    const getAllAdminsExceptSelf = async () => {
      try {
        const response = await axiosInstance.get('/admins/exclude-self');
        // console.log(response.data.data);
        setOtherRegisteredAdmins(response.data.data)
      } catch (error) {
        console.error('Error fetching admins:', error);
        throw error;
      }
    };
    getAllAdminsExceptSelf()
  }, [])

  const toggleAdminVerificationStatus = async (id) => {
    try {
      const response = await axiosInstance.patch(`/admins/toggle-verified/${id}`);
      if (response.status === 200) {
        toast.success(`${selectedAdmin.verifiedAdmin ? 'Unverify' : 'Verify'} Successfully`)
      }
      setOtherRegisteredAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id === id ? { ...admin, verifiedAdmin: !admin.verifiedAdmin } : admin
        )
      );
    } catch (error) {
      // console.error('Error toggling admin verified status:', error);
      // throw error;
      toast.error("Failed, Please try again")
    }
  };

  const toggleSuperAdminStatus = async (id) => {
    try {
      const response = await axiosInstance.patch(`/admins/toggle-super-admin/${id}`);
      if (response.status === 200) {
        toast.success(`${selectedAdmin.isSuperAdmin ? 'Remove Super Admin' : 'Make Super Admin'} Successfully`)
      }
      setOtherRegisteredAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id === id ? { ...admin, isSuperAdmin: !admin.isSuperAdmin } : admin
        )
      );
    } catch (error) {
      toast.error("Failed, Please try again")
    }
  };

  const handleToggleClick = (admin, action) => {
    setSelectedAdmin(admin)
    setAction(action)
    if (action === "toggleVerification") {
      setModalMessage(`Are you sure you want to ${admin.verifiedAdmin ? 'unverify' : 'verify'} this admin?`);
    } else {
      setModalMessage(`Are you sure you want to ${admin.isSuperAdmin ? 'Remove Super Admin' : 'Make Super Admin'} this admin?`);
    }
    setIsModalOpen(true);
  }

  const handleConfirmToggle = () => {
    if (action === "toggleVerification") {
      toggleAdminVerificationStatus(selectedAdmin._id);
    } else {
      toggleSuperAdminStatus(selectedAdmin._id)
    }
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
  };

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-6xl flex-grow bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-xl font-semibold text-gray-800">Users</h2>
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
                  <Button
                    children={<div className='flex items-center'>
                      {admin.verifiedAdmin ? 'Unverify' : 'Verify'}
                    </div>}
                    color="white"
                    bgColor={`${admin.verifiedAdmin ? '[#06B6D4]' : 'green-600'}`}
                    hoverColor={`${admin.verifiedAdmin ? '[#0891B2]' : 'green-700'}`}
                    ringColor='gray'
                    onClick={() => handleToggleClick(admin, 'toggleVerification')}
                    additionalClasses=''
                  />

                  <Button
                    children={<div className='flex items-center'>
                      {admin.isSuperAdmin ? 'Remove Super Admin' : 'Make Super Admin'}
                    </div>}
                    color="white"
                    bgColor={`${admin.isSuperAdmin ? '[#8E9BAE]' : '[#2F89E3]'}`}
                    hoverColor={`${admin.isSuperAdmin ? '[#788392]' : '[#0891B2]'}`}
                    ringColor='gray'
                    onClick={() => handleToggleClick(admin, "toggleSuperAdmin")}
                    additionalClasses='ml-4'
                  />
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
