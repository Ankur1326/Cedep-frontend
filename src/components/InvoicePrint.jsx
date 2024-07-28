import React from 'react';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const InvoicePrint = React.forwardRef((props, ref) => {
    const { invoice, student } = props;

    return (
        <div ref={ref} style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100vh' }}>
            {[0, 1].map((_, index) => (
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
            ))}
        </div>
    );
});

export default InvoicePrint;
