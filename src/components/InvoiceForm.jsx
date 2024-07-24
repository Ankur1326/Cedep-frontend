// src/components/InvoiceForm.js
import React, { useState, useEffect, useRef } from 'react';
import { createInvoice } from '../store/slices/invoiceSlice';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../helper/axiosInstance';
import { toast } from 'react-toastify';

const generateInvoiceNumber = () => {
    return "CEDEP/" + Math.floor(100000 + Math.random() * 900000).toString();
}

// Function to get today's date in YYYY-MM-DD format
const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const InvoiceForm = () => {
    const dispatch = useDispatch();
    const { invoice, loading, error } = useSelector((state) => state.invoice);
    const registrationInputRef = useRef(null);
    const [formdata, setFormdata] = useState({
        fullName: '',
        groupName: '',
        mobileNumber: '',
        registrationNum: '',
        invoice: {
            invoiceNum: generateInvoiceNumber(),
            invoiceDate: getTodayDate(),
            modeOfPayment: 'Cash',
            discount: '0',
            particulars: 'Tution Fees',
            subTotal: '',
            taxableAmount: '',
            VAT: '',
            grandTotal: '',
            authorizedSign: '',
            printDate: getTodayDate(),
        },
    });

    useEffect(() => {
        if (registrationInputRef.current) {
            registrationInputRef.current.focus();
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        const registrationNum = formdata.registrationNum
        console.log("Search Registration Number: ", registrationNum);
        try {
            const response = await axiosInstance.post(`/invoices/find-invoice-regNum`, { registrationNum })
            console.log(response.data.message);
            if (response.data.message === "This invoice is already exist!") {
                // toast.success(response.message);
                toast.info("This invoice is already exist!")
                const { fullName, mobileNumber, groupName } = response.data.data
                setFormdata((prevData) => ({
                    ...prevData,
                    fullName,
                    mobileNumber,
                    groupName,
                }))
            } else {
                // console.log(response.data.message);
                toast.error(response.data.message)
            }

        } catch (error) {

        }
    };

    const generateRegistrationNumber = () => {
        const length = 9;
        let registrationNumber = '';

        for (let i = 0; i < length; i++) {
            const randomDigit = Math.floor(Math.random() * 10);
            registrationNumber += randomDigit;
        }
        setFormdata((prevdata) => ({
            ...prevdata,
            registrationNum: registrationNumber
        }))
    }

    useEffect(() => {
        const grandTotal = Number(formdata.invoice.grandTotal) || 0;
        const discount = Number(formdata.invoice.discount) || 0;

        // Calculate subTotal before discount and VAT
        const subTotal = grandTotal / 1.13;

        // Calculate taxable amount after discount
        const taxableAmount = subTotal - discount;

        // Calculate VAT based on taxable amount
        const VAT = taxableAmount * 0.13;

        setFormdata((prevData) => ({
            ...prevData,
            invoice: {
                ...prevData.invoice,
                subTotal: Math.round(subTotal),
                taxableAmount: Math.round(taxableAmount),
                VAT: Math.round(VAT),
            },
        }));
    }, [formdata.invoice.grandTotal, formdata.invoice.discount]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name in formdata.invoice) {
            setFormdata((prevData) => ({
                ...prevData,
                invoice: {
                    ...prevData.invoice,
                    [name]: value,
                },
            }));
        } else {
            setFormdata((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleParticularChange = (index, e) => {
        const { name, value } = e.target;
        const updatedParticulars = formdata.particulars.map((particular, idx) =>
            idx === index ? { ...particular, [name]: value } : particular
        );
        setFormdata({ ...formdata, particulars: updatedParticulars });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("formdata : ", formdata);
        try {
            dispatch(createInvoice(formdata))
                .unwrap()
                .then((response) => {
                    toast.success(response.message);
                    setFormdata((prevData) => ({
                        ...prevData,
                        fullName: '',
                        groupName: '',
                        mobileNumber: '',
                        invoice: {
                            ...prevData.invoice,
                            invoiceNum: generateInvoiceNumber(),
                            invoiceDate: getTodayDate(),
                            modeOfPayment: 'Cash',
                            discount: '0',
                            particulars: 'Tuition Fees',
                            subTotal: '',
                            taxableAmount: '',
                            VAT: '',
                            grandTotal: '',
                            authorizedSign: '',
                            printDate: getTodayDate(),
                        },
                    }));
                })
                .catch((error) => {
                    toast.error(`Error: ${error.message || 'Failed to create invoice'}`);
                });
        } catch (error) {
            console.log("Error while creating invoice : ", error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8 mt-8 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-blue-700 mb-2">Create Invoice</h1>
            <div className="flex justify-between items-center mb-6">
                <img src="/public/logo.png" alt="CEDEP Logo" className="h-12" />
                <div className="">
                    <p className="text-gray-600 text-sm text-end">VAT Number: 302833348</p>
                    <div className="text-end mt-4">
                        <h2 className="text-[16px] font-semibold text-gray-800">Nepal Centre for Development & Policy Studies Pvt. Ltd.</h2>
                        <p className="text-gray-600 text-sm">NAME Building, Ramshah Path</p>
                        <p className="text-gray-600 text-sm">Putalisadak, KTM, Nepal</p>
                    </div>
                    <div className="text-end mt-4">
                        <p className="text-gray-600 text-sm">Website: <a href="http://www.cedepnepal.com.np" className="text-blue-500 underline">www.cedepnepal.com.np</a></p>
                        <p className="text-gray-600 text-sm">Email: <a href="mailto:info.cedep@gmail.com" className="text-blue-500 underline">info.cedep@gmail.com</a></p>
                        <p className="text-gray-600 text-sm">Phone: +977 1 5320255</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSearch} className="mb-6 max-w-lg mx-auto p-6">
                <div className="flex flex-col gap-4 items-center" >
                    <label className="block text-lg font-medium text-gray-700">Search Student Details:</label>
                    <input
                        type="number"
                        name="registrationNum"
                        required
                        value={formdata.registrationNum}
                        onChange={handleChange}
                        placeholder="Enter Registration Num"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FB3239] focus:border-transparent"
                        ref={registrationInputRef}
                    />
                    <button
                        type="submit"
                        className="bg-[#FB3239] max-w-fit text-white px-4 py-2 rounded-md hover:bg-[#de2c32] focus:outline-none focus:ring-2 focus:ring-[#de2c32] transition duration-300 ease-in-out"
                    >
                        Search
                    </button>
                </div>
                <div
                    className="text-blue-500 text-sm underline cursor-pointer mt-4 select-none"
                    onClick={generateRegistrationNumber}
                >
                    Click to generate registration number
                </div>
            </form>


            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="flex items-center justify-between">
                    <div>
                        <label className="text-start block text-sm font-medium text-gray-700">Invoice Number</label>
                        <input
                            type="text"
                            name="invoiceNum"
                            value={formdata.invoice.invoiceNum}
                            required
                            readOnly
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                        />
                    </div>
                    <div>
                        <label className="text-start block text-sm font-medium text-gray-700">Invoice Date</label>
                        <input
                            type="date"
                            name="invoiceDate"
                            value={formdata.invoice.invoiceDate}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    <div>
                        <label className="text-start block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            value={formdata.fullName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                        />
                    </div>
                    <div>
                        <label className="text-start block text-sm font-medium text-gray-700">Group</label>
                        <input
                            type="text"
                            name="groupName"
                            required
                            value={formdata.groupName}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                        />
                    </div>
                    <div>
                        <label className="text-start block text-sm font-medium text-gray-700">Mobile</label>
                        <input
                            type="text"
                            name="mobileNumber"
                            value={formdata.mobileNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 md:grid-cols- gap-4'>
                    <div>
                        <label className="text-start block text-sm font-medium text-gray-700">Mode of Payment</label>
                        <select
                            name="modeOfPayment"
                            required
                            value={formdata.invoice.modeOfPayment}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                        >
                            <option value="Cash">Cash</option>
                            <option value="Cheque">Cheque</option>
                            <option value="Bank Deposit">Bank Deposit</option>
                            <option value="eSewa">eSewa</option>
                            <option value="Khalti">Khalti</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-start block text-sm font-medium text-gray-700">Discount</label>
                        <input
                            type="number"
                            name="discount"
                            value={formdata.invoice.discount}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-[16px] font-medium uppercase tracking-wider border-r border-gray-200">S.N</th>
                                <th className="px-6 py-3 text-left text-[16px] font-medium uppercase tracking-wider border-r border-gray-200">Particulars</th>
                                <th className="px-6 py-3 text-left text-[16px] font-medium uppercase tracking-wider border-r border-gray-200">Qty</th>
                                <th className="px-6 py-3 text-left text-[16px] font-medium uppercase tracking-wider border-r border-gray-200">Rate</th>
                                <th className="px-6 py-3 text-left text-[16px] font-medium uppercase tracking-wider">Total</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] font-medium text-gray-900 border-r border-gray-200">1</td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] font-medium text-gray-900 border-r border-gray-200">
                                    <select
                                        name="particulars"
                                        value={formdata.particulars}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md text-[14px] focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                                    >
                                        <option value="Tuition Fees">Tuition Fees</option>
                                        <option value="Meterials Fees">Meterials Fees</option>
                                        <option value="Exam Fees">Exam Fees</option>
                                        <option value="Library Fees">Library Fees</option>
                                    </select>
                                </td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900"></td>
                            </tr>
                            <tr>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] font-medium text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] font-medium text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900 border-r border-gray-200">Sub Total</td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900">{formdata.invoice.subTotal}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] font-medium text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] font-medium text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900 border-r border-gray-200">Discount</td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900">{formdata.invoice.discount}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] font-medium text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] font-medium text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900 border-r border-gray-200">Taxable Amount</td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900">{formdata.invoice.taxableAmount}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] font-medium text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] font-medium text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900 border-r border-gray-200">13% VAT</td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900">{formdata.invoice.VAT}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] font-medium text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] font-medium text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900 border-r border-gray-200"></td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900 border-r border-gray-200">Grand Total</td>
                                <td className="px-6 py-3 whitespace-nowrap text-[14px] text-gray-900">
                                    <input
                                        type="number"
                                        name="grandTotal"
                                        required
                                        value={formdata.invoice.grandTotal}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-400 rounded-md text-[14px] focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                        <label className="text-start block text-sm font-medium text-gray-700">Authorized Sign</label>
                        <input
                            type="text"
                            name="authorizedSign"
                            value={formdata.invoice.authorizedSign}
                            readOnly
                            disabled
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                        />
                    </div>
                    <div>
                        <label className="text-start block text-sm font-medium text-gray-700">Print Date</label>
                        <input
                            type="date"
                            name="printDate"
                            value={formdata.invoice.printDate}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3699FF]"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default InvoiceForm;
