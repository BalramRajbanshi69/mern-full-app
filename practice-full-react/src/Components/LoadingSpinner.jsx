import React from 'react'

const LoadingSpinner = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default LoadingSpinner