import React from 'react'

const ErrorMessage = ({message}) => {
  return (
    <div>
      <div className="p-4 text-red-500 rounded-lg bg-red-50">
        <p className="font-medium">Error: {message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage