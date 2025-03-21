import React from 'react'
import { ToastContainer } from 'react-toastify';

const Toast = () => {
  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={true}
        draggable={true}
        pauseOnHover={true}
        theme="dark"
        limit={3}
      />
    </div>
  );
}

export default Toast