import React from 'react';
import { useNavigate } from 'react-router-dom';

const Farmer = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token and role from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <>
      {/* NavBar Section  */}
      <nav className="bg-white-800 p-4 text-grey flex justify-between items-center">
        <div className="text-2xl text-grey font-bold">
          <span className=" text-green-600 font-bold">Harvest</span> Hub
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout} 
            className="text-white font-medium px-4 py-1 rounded-md bg-green-500 shadow-2xl hover:bg-green-600"
          >
            Logout
          </button>
        </div>
      </nav>
      <br />
      <h1 className='text-5xl font-semibold'> This is Farmer Componentt</h1>
    </>
  );
};

export default Farmer;
