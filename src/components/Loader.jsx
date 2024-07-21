// Loader.js
import React from 'react';
import { PulseLoader } from 'react-spinners'

const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <PulseLoader color='#004BFF' />
        </div>
    );
};

export default Loader;
