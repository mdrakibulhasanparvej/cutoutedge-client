import React from 'react';

const LoadingSpinner = ({ text }) => {
    return <div className='flex justify-center gap-2 items-center h-100 text-sky-500 bg-white'>
        <span className="loading loading-spinner loading-lg"></span>
        <p>{text}</p>
    </div>
};

export default LoadingSpinner;