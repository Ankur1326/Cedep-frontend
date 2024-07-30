import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../helper/axiosInstance';
import InvoiceDetailModal from '../modals/InvoiceDetailModal';
import { formatDate } from '../utility/formateDate';
import ModalLoader from '../components/ModalLoader';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';

const StudentDetail = ({ }) => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isInvoicModalOpen, setInvoicModalOpen] = useState(false);
    const [invoiceDetails, setInvoicesDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({});

    useEffect(() => {
        const fetchStudentDetail = async () => {
            try {
                const response = await axiosInstance.get(`/students/student/${studentId}`);
                setStudent(response.data.data);
                setEditedData(response.data.data)
                // setInvoices(response.data.data.invoices);
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        fetchStudentDetail();
    }, [studentId]);

    useEffect(() => {
        const fetchStudentInvoicesSummary = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/invoices/get-student-invoices-summary/${studentId}`);
                setInvoices(response.data.data);
                // console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching student invoices:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchStudentInvoicesSummary();
    }, [studentId]);

    const handleFetchInvoiceDetails = async (invoiceId) => {
        if (!invoiceId) {
            return
        }
        try {
            setLoading(true)
            const response = await axiosInstance.get(`/invoices/get-invoice-details/${invoiceId}`)
            // console.log(response.data.data);
            setInvoicesDetails(response.data.data[0])
            setInvoicModalOpen(true)
        } catch (error) {
            console.log("Error while fetching Invoice details");
        } finally {
            setLoading(false)
        }
    }

    const handleSaveChanges = async () => {
        try {
            const response = await axiosInstance.put(`/students/update-student-details/${studentId}`, editedData);
            if (response.status === 200) {
                toast.success("Successfully Updated")
            }
            setStudent(editedData);
            setEditMode(false);
        } catch (error) {
            // setError('Failed to update student data');
            toast.error('Failed to update student data')
            console.log("Error while updating student details: ", error);
        }
    }

    const handleEditButtonClick = () => {
        if (editMode) {
            handleSaveChanges();
        } else {
            setEditMode(true);
        }
    }

    const onClose = () => {
        setInvoicModalOpen(false)
    }

    return (
        <div className='w-full bg-gray-50'>
            {
                isLoading && <ModalLoader />
            }
            <div className="relative w-full flex items-center justify-around flex-col sm:flex-row p-6 bg-white">
                {/* Edit Button */}
                <button
                    className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600"
                    onClick={handleEditButtonClick}
                >
                    {editMode ? <FaCheckCircle /> : <FaEdit />}
                </button>

                <div className="flex flex-col items-center md:w-1/3 mb-6 md:mb-0 md:border-r md:border-gray-200">
                    <img
                        src={student?.passportSizePhoto ? student.passportSizePhoto : '/StudentProfile.jpeg'}
                        alt="Profile"
                        className="w-44 h-44 rounded-full border-2 border-gray-300"
                    />
                    <h1 className="text-2xl font-bold mt-4">{student?.fullName}</h1>
                </div>

                <div className="w-full md:w-1/2">
                    <div className="flex h-fit p-3 border-b">
                        <span className="text-gray-500 w-1/2 text-start">Name</span>
                        {
                            editMode ? (
                                <input
                                    type="text"
                                    value={editedData.fullName}
                                    onChange={(e) => setEditedData({ ...editedData, fullName: e.target.value })}
                                    className="block px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                                />
                            ) : (
                                <span className="font-semibold text-gray-800 w-1/2 text-start">{student?.fullName}</span>
                            )
                        }

                    </div>
                    <div className="flex h-fit p-3 border-b">
                        <span className="text-gray-500 w-1/2 text-start">Email</span>
                        {
                            editMode ? (
                                <input
                                    type="text"
                                    value={editedData.email}
                                    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                                    className="block px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                                />
                            ) :
                                <span className="font-semibold text-gray-800 w-1/2 text-start">{student?.email ?? 'N/A'}</span>
                        }

                    </div>
                    <div className="flex h-fit p-3 border-b">
                        <span className="text-gray-500 w-1/2 text-start">Mobile</span>
                        {
                            editMode ? (
                                <input
                                    type="text"
                                    value={editedData.mobileNumber}
                                    onChange={(e) => setEditedData({ ...editedData, mobileNumber: e.target.value })}
                                    className="block px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                                />
                            ) :
                                <span className="font-semibold text-gray-800 w-1/2 text-start">{student?.mobileNumber ?? 'N/A'}</span>
                        }
                    </div>
                    <div className="flex h-fit p-3 border-b">
                        <span className="text-gray-500 w-1/2 text-start">Registration Number</span>
                        <span className="font-semibold text-gray-800 w-1/2 text-start">{student?.registrationNum ?? 'N/A'}</span>
                    </div>
                    <div className="flex h-fit p-3 border-b">
                        <span className="text-gray-500 w-1/2 text-start">Group Name</span>
                        {
                            editMode ? (
                                <input
                                    type="text"
                                    value={editedData.groupName}
                                    onChange={(e) => setEditedData({ ...editedData, groupName: e.target.value })}
                                    className="block px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                                />
                            ) :
                                <span className="font-semibold text-gray-800 w-1/2 text-start">{student?.groupName ?? 'N/A'}</span>
                        }
                    </div>
                    <div className="flex h-fit p-3 border-b">
                        <span className="text-gray-500 w-1/2 text-start">Permanent Address</span>
                        {
                            editMode ? (
                                <input
                                    type="text"
                                    value={editedData.permanentAddress}
                                    onChange={(e) => setEditedData({ ...editedData, permanentAddress: e.target.value })}
                                    className="block px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                                />
                            ) :
                                <span className="font-semibold text-gray-800 w-1/2 text-start">{student?.permanentAddress ?? 'N/A'}</span>
                        }
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 m-auto mt-5 overflow-hidden bg-white">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 bg-gray-50">Invoices</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Num</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode of Payment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {invoices.map((invoice, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleFetchInvoiceDetails(invoice._id)}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">{invoice.invoiceNum}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{invoice.modeOfPayment}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(invoice.invoiceDate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{invoice?.grandTotal}</td>
                                    {/* <td className="px-6 py-4 whitespace-nowrap text-blue-500 hover:underline cursor-pointer">
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {
                        isInvoicModalOpen && <InvoiceDetailModal onClose={onClose} invoiceDetails={invoiceDetails} />
                    }
                </div>
            </div>
        </div>
    );
};

export default StudentDetail;
