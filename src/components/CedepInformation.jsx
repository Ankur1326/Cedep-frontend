import React from 'react'

function CedepInformation() {
    return (
        //     <div className="bg-white shadow rounded-lg p-8 mb-8">
        //   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        //     {/* Left Side */}
        //     <div>
        //       <h2 className="text-3xl font-bold text-red-600">CEDEP लोक सेवा</h2>
        //       <p className="text-gray-600">Online Class Application Form</p>
        //       <div className="mt-6">
        //         <h3 className="text-xl font-semibold">Nepal Centre for Development and Policy Studies Pvt.Ltd.</h3>
        //         <p className="mt-2 text-gray-700">
        //           <strong>CEDEP Nepal</strong> – लोक सेवा तयारी कक्षा<br />
        //           <strong>Address:</strong> NAME Building, Ram Shah Path, Kathmandu.<br />
        //           <strong>Phone:</strong> 01-422025 || 9851155556<br />
        //           <strong>Website:</strong> <a href="http://www.cedepnepal.com.np" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">www.cedepnepal.com.np</a>
        //         </p>
        //       </div>
        //     </div>
        //     {/* Right Side */}
        //     <div>
        //       <h3 className="text-xl font-semibold mb-2">भर्ना फिस डिपोजिट गर्न बैंक खाता विवरण निम्नानुसार:</h3>
        //       <p className="mt-2 text-gray-700">
        //         <strong>Bank NAME:</strong> Laxmi Sunrise Bank Limited<br />
        //         <strong>Branch:</strong> Putalisadak, Kathmandu<br />
        //         <strong>खाता नम्बर:</strong> 0220287954701001<br />
        //         <strong>Account Holders NAME:</strong> Nepal Centre for Dev Policy Studi
        //       </p>
        //       <p className="mt-4 text-gray-700">
        //         <strong>Office Hours:</strong> Sunday - Friday, 10:00 AM - 5:00 PM<br />
        //         <strong>Contact Person:</strong> Mr. Ram Bahadur<br />
        //         <strong>Email:</strong> info@cedepnepal.com.np<br />
        //         <strong>Hotline:</strong> 1234-567890
        //       </p>
        //     </div>
        //   </div>
        // </div>

        // <div className="min-h-screen bg-gray-100 p-6">
        //     <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        //         <div className="mb-6">
        //             <h2 className="text-3xl font-bold text-red-600">CEDEP लोक सेवा</h2>
        //             <h2 className="text-xl text-center text-gray-700 mb-4">Online Class Application Form</h2>
        //             <div className="flex flex-wrap">
        //                 <div className="w-full md:w-1/2 lg:w-1/3 p-2">
        //                     <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
        //                         <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Information</h3>
        //                         <p className="text-gray-600 mb-2">Nepal Centre for Development and Policy Studies Pvt.Ltd.</p>
        //                         <p className="text-gray-600 mb-2">CEDEP Nepal – लोक सेवा तयारी कक्षा</p>
        //                         <p className="text-gray-600 mb-2">Address: NAME Building, Ram Shah Path, Kathmandu.</p>
        //                         <p className="text-gray-600 mb-2">Phone: 01-422025 || 9851155556</p>
        //                         <p className="text-gray-600 mb-2">Website: <a href="http://www.cedepnepal.com.np" className="text-blue-500">www.cedepnepal.com.np</a></p>
        //                     </div>
        //                 </div>
        //                 <div className="w-full md:w-1/2 lg:w-1/3 p-2">
        //                     <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
        //                         <h3 className="text-lg font-semibold text-gray-700 mb-2">Bank Information</h3>
        //                         <p className="text-gray-600 mb-1"><span className="font-semibold">Bank NAME:</span> Laxmi Sunrise Bank Limited</p>
        //                         <p className="text-gray-600 mb-1"><span className="font-semibold">Branch:</span> Putalisadak, Kathmandu</p>
        //                         <p className="text-gray-600 mb-1"><span className="font-semibold">खाता नम्बर:</span> 0220287954701001</p>
        //                         <p className="text-gray-600 mb-1"><span className="font-semibold">Account Holders NAME:</span> Nepal Centre for Dev Policy Studi</p>
        //                     </div>
        //                 </div>
        //                 <div className="w-full md:w-1/2 lg:w-1/3 p-2">
        //                     <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
        //                         <h3 className="text-lg font-semibold text-gray-700 mb-2">Office Information</h3>
        //                         <p className="text-gray-600 mb-2"><span className="font-semibold">Office Hours:</span> Sunday - Friday, 10:00 AM - 5:00 PM</p>
        //                         <p className="text-gray-600 mb-2"><span className="font-semibold">Contact Person:</span> Mr. Ram Bahadur</p>
        //                         <p className="text-gray-600 mb-2"><span className="font-semibold">Email:</span> info@cedepnepal.com.np</p>
        //                         <p className="text-gray-600 mb-2"><span className="font-semibold">Hotline:</span> 1234-567890</p>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //         {/* Placeholder for form that will be added later */}
        //         <div className="mt-6">
        //             {/* Add form component here later */}
        //         </div>
        //     </div>
        // </div>

        <div className="bg-white p-6">
            <div className="mb-6 text-center">
                <h2 className="text-3xl font-bold text-red-600 mb-4">CEDEP लोक सेवा</h2>
                <h2 className="text-xl text-gray-700 mb-6">Online Class Application Form</h2>
            </div>

            <div className="border-b-2 border-gray-200 mb-6"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Information</h3>
                    <p className="text-gray-600 mb-2">Nepal Centre for Development and Policy Studies Pvt.Ltd.</p>
                    <p className="text-gray-600 mb-2">CEDEP Nepal – लोक सेवा तयारी कक्षा</p>
                    <p className="text-gray-600 mb-2">Address: NAME Building, Ram Shah Path, Kathmandu.</p>
                    <p className="text-gray-600 mb-2">Phone: 01-4220255 || 9851155556</p>
                    <p className="text-gray-600 mb-2">
                        Website: <a href="http://www.cedepnepal.com.np" className="text-blue-500">www.cedepnepal.com.np</a>
                    </p>
                </div>

                <div className="p-4 bg-gray-100 rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Bank Information</h3>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Bank NAME:</span> Laxmi Sunrise Bank Limited</p>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Branch:</span> Putalisadak, Kathmandu</p>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">खाता नम्बर:</span> 0220287954701001</p>
                    <p className="text-gray-600 mb-1"><span className="font-semibold">Account Holders NAME:</span> Nepal Centre for Dev Policy Studi</p>
                </div>
            </div>

            <div className="border-b-2 border-gray-200 mb-6"></div>
        </div>
    )
}

export default CedepInformation