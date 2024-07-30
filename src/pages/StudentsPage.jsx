import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentTableList from '../components/StudentTableList.jsx';
import axiosInstance from '../helper/axiosInstance.js';
import Button from '../components/Button.jsx';
import StudentSkeletonLoader from '../components/skeletonsLoaders/StudentSkeletonLoader.jsx';

function StudentsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async (pageNumber) => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`/students/summary?page=${pageNumber}&limit=${limit}`);
            const { data, totalPages } = response.data.data;
            setStudents(data);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Error fetching students:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white p-4 w-full">
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
                    <Button
                        onClick={() => navigate("/register-student")}
                        children="Register Student"
                        color="white"
                        bgColor='[#3699FF]'
                        hoverColor='[#2f89e3]'
                    />
                </div>
            </div>
            <div className="overflow-x-auto flex-grow">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3 border-r border-gray-300" style={{ width: '5%' }}></th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left border-r border-gray-300" style={{ width: '20%' }}>Name</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left border-r border-gray-300" style={{ width: '15%' }}>Group No.</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left border-r border-gray-300" style={{ width: '15%' }}>Mobile</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left border-r border-gray-300" style={{ width: '20%' }}>Registration Num</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left border-r border-gray-300" style={{ width: '25%' }}>Registered date</th>
                        </tr>
                    </thead>
                    {loading ? (
                        <StudentSkeletonLoader
                            rowCount={limit}
                            columnWidths={['5%', '20%', '15%', '15%', '20%', '25%']} // Adjust as needed
                            rowHeight={30}
                        />
                    ) : (
                        <tbody className="divide-y divide-gray-100">
                            {students.map((student, index) => (
                                <StudentTableList key={student._id} student={student} index={index} />
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

            <div className="flex justify-end items-center p-4">
                <button
                    className={`px-3 py-1 rounded-l-md ${page <= 1 ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white'}`}
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page <= 1}
                >
                    Previous
                </button>
                <span className="px-4 py-1 text-gray-600">Page {page} of {totalPages}</span>
                <button
                    className={`px-3 py-1 rounded-r-md ${page >= totalPages ? 'bg-gray-200 text-gray-400' : 'bg-blue-500 text-white'}`}
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}


// const SkeletonLoader = ({ rowCount }) => {
//     const rows = Array.from({ length: rowCount }, (_, index) => index);

//     return (
//         <tbody className="divide-y divide-gray-100">
//             {rows.map((row) => (
//                 <tr key={row} className="animate-pulse mt-1">
//                     <td className="p-3 border-r bg-gray-200 h-11"></td>
//                     <td className="p-3 border-r bg-gray-200 h-10"></td>
//                     <td className="p-3 border-r bg-gray-200 h-10"></td>
//                     <td className="p-3 border-r bg-gray-200 h-10"></td>
//                     <td className="p-3 border-r bg-gray-200 h-10"></td>
//                     <td className="p-3 border-r bg-gray-200 h-10"></td>
//                 </tr>
//             ))}
//         </tbody>
//     );
// };

export default StudentsPage;
