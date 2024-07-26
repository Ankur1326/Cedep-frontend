import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const StudentTableList = ({ student, index }) => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <tr key={index} className="hover:bg-gray-50">
            <td className="p-3 border-r">{index + 1}.</td>
            <td className="p-3 text-sm text-gray-700 border-r">{student.member}</td>
            <td className="p-3 text-sm border-r">{student.groupNo}</td>
            <td className="p-3 text-sm text-gray-700 border-r">{student.mobile}</td>
            <td className="p-3 text-sm text-gray-700 border-r">{student.registeredDate}</td>
            <td className="p-3 text-sm text-gray-700 border-r">{student.amount}</td>
            <td className="p-3 text-sm text-blue-500 hover:underline cursor-pointer">
                Download
            </td>
        </tr>
    );
};

export default StudentTableList;
