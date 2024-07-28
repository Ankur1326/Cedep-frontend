import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../helper/axiosInstance';
import moment from 'moment';
import { RotatingLines } from 'react-loader-spinner';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const StudentDetail = ({ }) => {
    const { studentId } = useParams();
    const [student, setStudent] = useState(null);
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudentDetail = async () => {
            try {
                const response = await axiosInstance.get(`/students/student/${studentId}`);
                setStudent(response.data.data);
                // setInvoices(response.data.data.invoices);
            } catch (error) {
                console.error('Error fetching student details:', error);
            }
        };

        fetchStudentDetail();
    }, [studentId]);

    useEffect(() => {
        const fetchStudentInvoices = async () => {
            try {
                setLoading(true)
                const response = await axiosInstance.get(`/invoices/get-student-invoices/${studentId}`);
                setInvoices(response.data.data);
                console.log(response.data.data);
            } catch (error) {
                console.error('Error fetching student invoices:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchStudentInvoices();
    }, [studentId]);

    if (!student) {
        return <div className='flex w-full items-center justify-center h-20'>
            <RotatingLines
                visible={true}
                height="36"
                width="36"
                color="gray"
                strokeColor='#3B82F6'
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>;
    }

    return (
        <div className='w-full'>
            <div className="w-full border flex flex-col items-center bg-white">
                <div className="w-full flex items-center justify-around p-6">
                    <div className="flex flex-col items-center md:w-1/3 mb-6 md:mb-0 md:border-r md:border-gray-200">
                        <img
                            src={student?.passportSizePhoto ? student.passportSizePhoto : '/StudentProfile.jpeg'}
                            alt="Profile"
                            className="w-44 h-44 rounded-full border-2 border-gray-300"
                        />
                        <h1 className="text-2xl font-bold mt-4">{student.fullName}</h1>
                    </div>

                    <div className="w-full md:w-1/2">
                        <div className="flex h-fit p-3 border-b">
                            <span className="text-gray-500 w-1/2 text-start">Name</span>
                            <span className="font-semibold text-gray-800 w-1/2 text-start">{student.fullName}</span>
                        </div>
                        <div className="flex h-fit p-3 border-b">
                            <span className="text-gray-500 w-1/2 text-start">Email</span>
                            <span className="font-semibold text-gray-800 w-1/2 text-start">{student.email ?? 'N/A'}</span>
                        </div>
                        <div className="flex h-fit p-3 border-b">
                            <span className="text-gray-500 w-1/2 text-start">Mobile</span>
                            <span className="font-semibold text-gray-800 w-1/2 text-start">{student.mobileNumber ?? 'N/A'}</span>
                        </div>
                        <div className="flex h-fit p-3 border-b">
                            <span className="text-gray-500 w-1/2 text-start">Registration Number</span>
                            <span className="font-semibold text-gray-800 w-1/2 text-start">{student.registrationNum ?? 'N/A'}</span>
                        </div>
                        <div className="flex h-fit p-3 border-b">
                            <span className="text-gray-500 w-1/2 text-start">Group Name</span>
                            <span className="font-semibold text-gray-800 w-1/2 text-start">{student.groupName ?? 'N/A'}</span>
                        </div>
                        <div className="flex h-fit p-3 border-b">
                            <span className="text-gray-500 w-1/2 text-start">Permanent Address</span>
                            <span className="font-semibold text-gray-800 w-1/2 text-start">{student.permanentAddress ?? 'N/A'}</span>
                        </div>
                    </div>
                </div>
                {/* <div>
                <div>
                    <h2 className="text-xl font-semibold mb-2">Course Details</h2>
                    <p><strong>Service:</strong> {student.service}</p>
                    {student.service === 'Public Service Commission (PSC)' && (
                        <p><strong>PSC Post:</strong> {student.psc_post?.name}</p>
                    )}
                    {student.service === 'Teacher Service Commission (TSC)' && (
                        <p><strong>Level:</strong> {student.level?.name}</p>
                    )}
                    {student.service === 'Banking Service' && (
                        <p><strong>Bank:</strong> {student.bank?.name}</p>
                    )}
                    {student.service === 'Health Service' && (
                        <p><strong>Health Service Post:</strong> {student.hc_post}</p>
                    )}
                    {student.service === 'Defense Service' && (
                        <p><strong>Department:</strong> {student.ds_department?.name}</p>
                    )}
                    {student.service === 'Other Course' && (
                        <p><strong>Other Course:</strong> {student.otherCourse?.specify}</p>
                    )}
                    <p><strong>Shift:</strong> {student.shift}</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Payment Details</h2>
                    <p><strong>Payment Mode:</strong> {student.paymentMode}</p>
                    <p><strong>Voucher Amount:</strong> {student.voucherAmount}</p>
                    <p><strong>Voucher Date:</strong> {moment(student.voucherDate).format('YYYY-MM-DD')}</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Registration</h2>
                    <p><strong>Registration Number:</strong> {student.registrationNum}</p>
                </div>
            </div> */}
            </div>
            <div className='flex items-center justify-evenly flex-wrap bg-white pt-5 md:w-'>
                {
                    isLoading ? (
                        <div className='flex w-full items-center justify-center h-20'>
                            <RotatingLines
                                visible={true}
                                height="36"
                                width="36"
                                color="gray"
                                strokeColor='#3B82F6'
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    ) : (
                        invoices && invoices.length > 0 ?
                            (
                                invoices.map((invoice) => (
                                    <div className=" flex flex-col justify-between max-w-2xl mx-auto p-4 py-1 border border-gray-400">
                                        <h2 className="font-bold text-lg text-center">TAX INVOICE</h2>
                                        <div className='flex flex-col gap-1'>
                                            <div className="flex justify-between items-center">
                                                <span className='text-sm'>Registration No. <strong>{student?.registrationNum}</strong></span>
                                                <img src="/logo.png" alt="CEDEP Logo" className="h-12 object-contain" />
                                            </div>
                                            <div className="text-center mb-1">
                                                <h2 className="font-bold text-sm">Nepal Centre for Development & Policy Studies Pvt. Ltd.</h2>
                                                <p className='text-xs'>Putalisadak, Kathmandu</p>
                                            </div>
                                            <div className="flex justify-between border-b-2 border-b-gray-300">
                                                <span className='text-xs'>Invoice No: <strong>{invoice?.invoiceNum}</strong></span>
                                                <span className='text-xs'>Date: <strong>{invoice ? formatDate(invoice.invoiceDate) : ''}</strong></span>
                                            </div>
                                        </div>
                                        <div>

                                        </div>
                                        <div className="flex h-fit">
                                            <span className="text-gray-500 w-1/3 text-start text-sm">Name</span>
                                            <span className="font-semibold text-sm text-gray-800 w-full text-start border-b border-b-gray-300">{student?.fullName}</span>
                                        </div>
                                        <div className="flex h-fit">
                                            <span className="text-gray-500 text-sm w-1/3 text-start">Group</span>
                                            <span className="font-semibold text-sm text-gray-800 w-full text-start border-b border-b-gray-300">{student?.groupName}</span>
                                        </div>
                                        <div className="flex h-fit">
                                            <span className="text-gray-500 text-sm w-1/3 text-start">Mobile No.</span>
                                            <span className="font-semibold text-sm text-gray-800 w-full text-start border-b border-b-gray-300">{student?.mobileNumber}</span>
                                        </div>
                                        <div className="flex gap-3 h-fit mb-2">
                                            <span className="text-gray-500 text-sm text-start">Mode of Payment : </span>
                                            <span className="font-semibold text-sm text-gray-800 text-start">{invoice?.modeOfPayment}</span>
                                        </div>
                                        <table className="w-full border-collapse border border-gray-300">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border border-gray-300 py-1 text-sm">S.N.</th>
                                                    <th className="border border-gray-300 py-1 text-sm">Particulars</th>
                                                    <th className="border border-gray-300 text-sm py-1">Qty</th>
                                                    <th className="border border-gray-300 text-sm py-1">Rate</th>
                                                    <th className="border border-gray-300 text-sm py-1">Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="border border-gray-300 text-sm text-center">1</td>
                                                    <td className="border border-gray-300 text-sm  text-center">Tuition Fee</td>
                                                    <td className="border border-gray-300 text-sm text-center"></td>
                                                    <td className="border border-gray-300 text-sm  text-center"></td>
                                                    <td className="border border-gray-300 text-sm text-center">{invoice?.subTotal}</td>
                                                </tr>
                                                {[0, 1, 2, 3, 4].map(() => (
                                                    <tr>
                                                        <td className="py-5 border-r border-r-gray-300"></td>
                                                        <td className="py-5 border-r border-r-gray-300"></td>
                                                        <td className="py-5 border-r border-r-gray-300"></td>
                                                        <td className="py-5 border-r border-r-gray-300"></td>
                                                        <td className="py-5 border-r border-r-gray-300"></td>
                                                    </tr>

                                                ))}
                                                <tr>
                                                    <td colSpan='2' className="border-t border-gray-300 text-sm  text-start px-1"></td>
                                                    <td colspan="2" className="border border-gray-300 text-sm  text-start px-1">Sub total</td>
                                                    <td className="border border-gray-300 text-sm text-center">{invoice?.subTotal}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan='2' className="text-sm  text-center"></td>
                                                    <td colspan="2" className="border border-gray-300 text-sm  text-start px-1">Discount</td>
                                                    <td className="border border-gray-300 text-sm text-center">{invoice?.discount}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan='2' className="text-sm  text-center"></td>
                                                    <td colspan="2" className="border border-gray-300 text-sm  text-start px-1">Taxable Amount</td>
                                                    <td className="border border-gray-300 text-sm text-center">{invoice?.taxableAmount}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan='2' className="text-sm  text-center"></td>
                                                    <td colspan="2" className="border border-gray-300 text-sm  text-start px-1">13% VAT</td>
                                                    <td className="border border-gray-300 text-sm text-center">{invoice?.VAT}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan='2' className="text-sm  text-center"></td>
                                                    <td colspan="2" className="border border-gray-300 text-sm  text-start px-1">Grand Total</td>
                                                    <td className="border border-gray-300 text-sm text-center">{invoice?.grandTotal}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className='flex justify-between mt-4 items-center'>
                                            <p className='text-sm'>E. & O.E.</p>
                                            <div>
                                                <p>__________________</p>
                                                <p className='text-xs text-center'>Auth. Signature</p>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <p className='text-xs'><strong>User : </strong> cedep</p>
                                            <p className='text-xs'><strong>Print Date : </strong>{invoice ? formatDate(invoice.printDate) : ''}</p>
                                        </div>
                                    </div>
                                ))
                            )
                            :
                            (
                                <div className='h-56 flex items-center text-base text-gray-500'>
                                    No Invoices found
                                </div>
                            )
                    )

                }
            </div>

        </div>

    );
};

export default StudentDetail;
