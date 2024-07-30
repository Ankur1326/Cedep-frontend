import React, { useRef } from 'react';
import { formatDate } from '../utility/formateDate';
import ReactToPrint from 'react-to-print';
import InvoicePrint from '../components/InvoicePrint';

const InvoiceDetailModal = ({ onClose, invoiceDetails }) => {
    const ref = useRef()

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="bg-white w-11/12 md:w-1/2 lg:w-1/3 p-6 rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg text-center">TAX INVOICE</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        &#x2715;
                    </button>
                </div>
                <div className='flex flex-col gap-1'>
                    <div className="flex justify-between items-center">
                        <span className='text-sm'>Registration No. <strong>{invoiceDetails?.student[0]?.registrationNum}</strong></span>
                        <img src="/logo.png" alt="CEDEP Logo" className="h-12 object-contain" />
                    </div>
                    <div className="text-center mb-1">
                        <h2 className="font-bold text-sm">Nepal Centre for Development & Policy Studies Pvt. Ltd.</h2>
                        <p className='text-xs'>Putalisadak, Kathmandu</p>
                    </div>
                    <div className="flex justify-between border-b-2 border-b-gray-300">
                        <span className='text-xs'>Invoice No: <strong>{invoiceDetails?.invoiceNum}</strong></span>
                        <span className='text-xs'>Date: <strong>{invoiceDetails ? formatDate(invoiceDetails?.invoiceDate) : ''}</strong></span>
                    </div>
                </div>
                <div className="flex h-fit">
                    <span className="text-gray-500 w-1/3 text-start text-sm">Name</span>
                    <span className="font-semibold text-sm text-gray-800 w-full text-start border-b border-b-gray-300">{invoiceDetails?.student[0].fullName}</span>
                </div>
                <div className="flex h-fit">
                    <span className="text-gray-500 text-sm w-1/3 text-start">Group</span>
                    <span className="font-semibold text-sm text-gray-800 w-full text-start border-b border-b-gray-300">{invoiceDetails?.student[0]?.groupName}</span>
                </div>
                <div className="flex h-fit">
                    <span className="text-gray-500 text-sm w-1/3 text-start">Mobile No.</span>
                    <span className="font-semibold text-sm text-gray-800 w-full text-start border-b border-b-gray-300">{invoiceDetails?.student[0]?.mobileNumber}</span>
                </div>
                <div className="flex gap-3 h-fit mb-2">
                    <span className="text-gray-500 text-sm text-start">Mode of Payment : </span>
                    <span className="font-semibold text-sm text-gray-800 text-start">{invoiceDetails?.modeOfPayment}</span>
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
                            <td className="border border-gray-300 text-sm  text-center">{invoiceDetails?.particular}</td>
                            <td className="border border-gray-300 text-sm text-center"></td>
                            <td className="border border-gray-300 text-sm  text-center"></td>
                            <td className="border border-gray-300 text-sm text-center">{invoiceDetails?.subTotal}</td>
                        </tr>
                        {[0, 1, 2, 3, 4].map((_, index) => (
                            <tr key={index}>
                                <td className="py-5 border-r border-r-gray-300"></td>
                                <td className="py-5 border-r border-r-gray-300"></td>
                                <td className="py-5 border-r border-r-gray-300"></td>
                                <td className="py-5 border-r border-r-gray-300"></td>
                                <td className="py-5 border-r border-r-gray-300"></td>
                            </tr>
                        ))}
                        <tr>
                            <td colspan='2' className="border-t border-gray-300 text-sm  text-start px-1"></td>
                            <td colspan="2" className="border border-gray-300 text-sm  text-start px-1">Sub total</td>
                            <td className="border border-gray-300 text-sm text-center">{invoiceDetails?.subTotal}</td>
                        </tr>
                        <tr>
                            <td colspan='2' className="text-sm  text-center"></td>
                            <td colspan="2" className="border border-gray-300 text-sm  text-start px-1">Discount</td>
                            <td className="border border-gray-300 text-sm text-center">{invoiceDetails?.discount}</td>
                        </tr>
                        <tr>
                            <td colspan='2' className="text-sm  text-center"></td>
                            <td colspan="2" className="border border-gray-300 text-sm  text-start px-1">Taxable Amount</td>
                            <td className="border border-gray-300 text-sm text-center">{invoiceDetails?.taxableAmount}</td>
                        </tr>
                        <tr>
                            <td colspan='2' className="text-sm  text-center"></td>
                            <td colspan="2" className="border border-gray-300 text-sm  text-start px-1">13% VAT</td>
                            <td className="border border-gray-300 text-sm text-center">{invoiceDetails?.VAT}</td>
                        </tr>
                        <tr>
                            <td colspan='2' className="text-sm  text-center"></td>
                            <td colspan="2" className="border border-gray-300 text-sm  text-start px-1">Grand Total</td>
                            <td className="border border-gray-300 text-sm text-center">{invoiceDetails?.grandTotal}</td>
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
                    <p className='text-xs'><strong>Print Date : </strong>{invoiceDetails ? formatDate(invoiceDetails.printDate) : ''}</p>
                </div>
                <div className='flex justify-end mt-4'>
                    <ReactToPrint
                        trigger={() => (
                            <button className="flex items-center px-4 py-2 bg-gray-500 text-white text-xs rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-150 ease-in-out">
                                <svg
                                    className="w-3 h-3 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 16h8M8 8h8M12 20v-4m0 0H8m4 0h4m4 4v-4m0 4V4m0 0H4m16 0L4 4m16 0v4m0 4v4m0 4H4"
                                    />
                                </svg>
                                Print Invoice
                            </button>
                        )}
                        content={() => ref.current}
                        pageStyle="@page { size: landscape; } body { margin: 0; }"
                    />
                </div>
                <div style={{ display: 'none' }}>
                    <InvoicePrint
                        ref={ref}
                        invoice={invoiceDetails}
                        student={invoiceDetails?.student[0]}
                    />
                </div>
            </div>
        </div>
    )
}

export default InvoiceDetailModal;
