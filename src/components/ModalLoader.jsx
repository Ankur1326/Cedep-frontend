// ModalLoader.js
import React from 'react';
import { PulseLoader } from 'react-spinners'

const ModalLoader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                <PulseLoader color='#004BFF' size={10} />
            </div>
        </div>
    );
};

export default ModalLoader;
