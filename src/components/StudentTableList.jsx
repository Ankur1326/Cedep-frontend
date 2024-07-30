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
        // console.log(student._id);
        const studentId = student._id
        navigate(`/students/${student._id}`);
    };

    return (
        <tr className="hover:bg-gray-50 cursor-pointer border-r border-l" onClick={handleRowClick}>
            <td className="p-3 border-r ">{index + 1}.</td>
            <td className="p-3 text-sm border-r text-gray-700">{student.fullName}</td>
            <td className="p-3 text-sm border-r">{student.groupName}</td>
            <td className="p-3 text-sm border-r text-gray-700">{student.mobileNumber}</td>
            <td className="p-3 text-sm border-r text-gray-700">{student.registrationNum}</td>
            <td className="p-3 text-sm border-r text-gray-700">{formattedDate}</td>
        </tr>
    );
};

export default StudentTableList;
