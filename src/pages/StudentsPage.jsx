import React, { useState } from 'react'
import StudentTable from '../components/StudentTableList.jsx'
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import StudentRegisterPage from './StudentRegisterPage.jsx';
import StudentTableList from '../components/StudentTableList.jsx';

function StudentsPage() {
    const sampleStudents = [
        { member: 'Student-2024-xd912c', status: 'Upcoming', date: '6 Aug, 2024', dueDate: 'HR Dept', amount: '$24.00' },
        { member: 'Student-2024-rq857m', status: 'Paid', date: '17 Jun, 2024', dueDate: '6 Aug, 2024', amount: '$29.99' },
        { member: 'Student-2024-jk563z', status: 'Paid', date: '30 Apr, 2024', dueDate: '6 Aug, 2024', amount: '$24.00' },
        { member: 'Student-2024-hg234x', status: 'Declined', date: '21 Apr, 2024', dueDate: '6 Aug, 2024', amount: '$6.59' },
        { member: 'Student-2024-lp098y', status: 'Paid', date: '14 Mar, 2024', dueDate: '6 Aug, 2024', amount: '$79.00' },
    ];
    
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Filter students based on search term
    const filteredStudents = sampleStudents.filter(student =>
        student.member.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Student Details</h2>
                <div>
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="p-2 border border-gray-300 rounded-md mr-4"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    <Link to="/register-student" className="bg-blue-500 text-white px-4 py-2 rounded-md">Register Student</Link>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th className="p-3 border-r"></th> {/* Empty header for the index column */}
                            <th className="p-3 text-sm font-semibold tracking-wide text-left border-r">Name</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left border-r">Group No.</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left border-r">Mobile</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left border-r">Registered date</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left border-r">Amount</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredStudents.map((student, index) => (
                            <StudentTableList student={student} index={index} />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center p-4 border-t border-gray-200">
                <div className="text-sm text-gray-700">
                    Show <span className="font-medium">5</span> per page
                </div>
                <div className="flex items-center">
                    <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-l-md">1</button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-600">2</button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-600">3</button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-r-md">...</button>
                </div>
            </div>
        </div>
    )
}

export default StudentsPage