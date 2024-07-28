import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import StudentTableList from '../components/StudentTableList.jsx';
import InfiniteScroll from 'react-infinite-scroll-component';
import 'tailwindcss/tailwind.css'; // Ensure Tailwind is imported
import axiosInstance from '../helper/axiosInstance.js';
import { RotatingLines } from 'react-loader-spinner'

function StudentsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const fetchStudents = async () => {
        try {
            const response = await axiosInstance.get(`/students/summary?page=${page}&limit=${limit}`);
            const { data, totalPages } = response.data.data;
            setStudents((prev) => [...prev, ...data]);
            setHasMore(page < totalPages);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

    useEffect(() => {
        fetchStudents();
    }, [page]);

    return (
        <div className="p-4 bg-white w-full min:h-screen">
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
            <div className="overflow-x-auto ">
                <InfiniteScroll
                    dataLength={students.length}
                    next={() => setPage((prev) => prev + 1)}
                    hasMore={hasMore}
                    loader={
                        <div className='flex w-full items-center justify-center h-20'>
                            <RotatingLines
                                visible={true}
                                height="26"
                                width="26"
                                color="gray"
                                strokeColor='#3B82F6'
                                strokeWidth="5"
                                animationDuration="0.75"
                                ariaLabel="rotating-lines-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                        </div>
                    }
                    endMessage={<p>No more students</p>}
                >
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 border-r border-gray-300"></th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left border-r border-gray-300">Name</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left border-r border-gray-300">Group No.</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left border-r border-gray-300">Mobile</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left border-r border-gray-300">Registration Num</th>
                                <th className="p-3 text-sm font-semibold tracking-wide text-left border-r border-gray-300">Registered date</th>
                                {/* <th className="p-3 text-sm font-semibold tracking-wide text-left">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {students.map((student, index) => (
                                <StudentTableList key={index} student={student} index={index} />
                            ))}
                        </tbody>
                    </table>
                </InfiniteScroll>

            </div>
            {/* <div className="flex justify-between items-center p-4 border-t border-gray-200">
                <div className="text-sm text-gray-700">
                    Show <span className="font-medium">5</span> per page
                </div>
                <div className="flex items-center">
                    <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-l-md">1</button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-600">2</button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-600">3</button>
                    <button className="px-3 py-1 bg-gray-200 text-gray-600 rounded-r-md">...</button>
                </div>
            </div> */}
        </div>
    )
}

export default StudentsPage