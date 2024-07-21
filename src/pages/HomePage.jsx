import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import axiosInstance from '../helper/axiosInstance';

function HomePage() {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <Header />
            <main className="flex-1 px-4 py-6 bg-gray-100 w-full">
                <Outlet />
            </main>
        </div>
    )
}

export default HomePage