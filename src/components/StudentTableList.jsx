import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentTableList = ({ student, index }) => {
    const navigate = useNavigate();

    const formattedDate = new Date(student.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    // Navigate to the student's detail page
    const handleRowClick = () => {
        navigate(`/students/${student._id}`);
    };

    return (
        <tr className="hover:bg-gray-50 cursor-pointer" onClick={handleRowClick}>
            <td className="p-3 border-r">{index + 1}.</td>
            <td className="p-3 text-sm text-gray-700 border-r">{student.fullName}</td>
            <td className="p-3 text-sm border-r">{student.groupName}</td>
            <td className="p-3 text-sm text-gray-700 border-r">{student.mobileNumber}</td>
            <td className="p-3 text-sm text-gray-700 border-r">{student.registrationNum}</td>
            <td className="p-3 text-sm text-gray-700 border-r">{formattedDate}</td>
            {/* <td className="p-3 text-sm text-blue-500 hover:underline cursor-pointer">
                Download
            </td> */}
        </tr>
    );
};

export default StudentTableList;
