import React, { useCallback, useEffect, useState } from 'react';
import { FaEdit, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import AdminList from '../components/AdminList';
import axiosInstance from '../helper/axiosInstance';
import { toast } from 'react-toastify';
import Button from '../components/Button';
import Skeleton from 'react-loading-skeleton';

function DashboardPage() {
  const [admin, setAdmin] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedAdmin, setEditedAdmin] = useState({});

  const handleFetchCurrentAdmin = async () => {
    try {
      const response = await axiosInstance.get('/admins/current-admin');
      setAdmin(response.data.data);
      setEditedAdmin(response.data.data);
    } catch (error) {
      setError('Failed to fetch admin data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = useCallback(async () => {
    try {
      const response = await axiosInstance.put('/admins/update-admin-details', editedAdmin);
      if (response.status === 200) {
        toast.success("Successfully Updated")
      }
      setAdmin(editedAdmin);
      setEditMode(false);
    } catch (error) {
      setError('Failed to update admin data.');
      toast.error('Failed to update admin data')
    }
  }, [editedAdmin]);

  const handleEditButtonClick = () => {
    if (editMode) {
      handleSaveChanges();
    } else {
      setEditMode(true);
    }
  };

  useEffect(() => {
    handleFetchCurrentAdmin();
  }, []);


  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* My Profile */}
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-500">My Profile</h2>
          <Button
            children={<div className='flex items-center'>
              {editMode ? <FaCheckCircle className="mr-2" /> : <FaEdit className="mr-2" />}
              {editMode ? 'Apply' : 'Edit'}
            </div>}
            color="white"
            bgColor='gray-500'
            hoverColor='gray-600'
            ringColor='gray'
            onClick={handleEditButtonClick}
            additionalClasses='flex justify-end'
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {
            loading ?
              (
                <MyDetailLoader />
              ) : (
                <DetailField
                  label="Username"
                  value={editedAdmin?.username}
                  editMode={editMode}
                  onChange={(value) => setEditedAdmin(prev => ({ ...prev, username: value }))}
                />
              )
          }
          {
            loading ? (
              <MyDetailLoader />
            ) : (
              <DetailField
                label="Full Name"
                value={editedAdmin?.fullName}
                editMode={editMode}
                onChange={(value) => setEditedAdmin(prev => ({ ...prev, fullName: value }))}
              />
            )
          }
          {
            loading ? (
              <MyDetailLoader />
            ) : (
              <DetailField
                label="Email"
                value={admin?.email}
                editMode={editMode}
                disabled
              />
            )
          }
          {
            loading ? (<MyDetailLoader />) : <VerificationStatus admin={admin} />
          }


        </div>
      </div>
      {/* Render AdminList only if the user is a Super Admin */}
      {admin?.isSuperAdmin ? <AdminList /> : null}
    </div>
  );
}

const DetailField = React.memo(({ label, value, editMode, onChange, disabled = false }) => (
  <div className="flex items-center justify-center space-x-5 p-4 bg-gray-100 rounded-md shadow-sm">
    <label className="block text-gray-600 font-semibold">{label}:</label>
    {editMode && !disabled ? (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
      />
    ) : (
      <span className="text-gray-800 font-medium">{value}</span>
    )}
  </div>
));

const VerificationStatus = React.memo(({ admin }) => (
  <div className="flex items-center justify-center space-x-5 p-4 bg-gray-100 rounded-lg shadow-sm">
    <div className='flex gap-2'>
      <label className="block text-gray-600 font-semibold">Verified Admin:</label>
      <span className={`flex items-center font-medium ${admin?.verifiedAdmin ? 'text-green-500' : 'text-red-500'}`}>
        {admin?.verifiedAdmin ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
        {admin?.verifiedAdmin ? 'Yes' : 'No'}
      </span>
    </div>
    <div className='flex gap-2'>
      <label className="block text-gray-600 font-semibold">Super Admin? :</label>
      <span className={`flex items-center font-medium ${admin?.isSuperAdmin ? 'text-green-500' : 'text-red-500'}`}>
        {admin?.isSuperAdmin ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
        {admin?.isSuperAdmin ? 'Yes' : 'No'}
      </span>
    </div>
  </div>
));

const MyDetailLoader = () => {
  return (
    <div className="w-full sm:w-full">
      <Skeleton height={60} width="100%" />
    </div>
  )
}

export default DashboardPage;
