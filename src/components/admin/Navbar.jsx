import React from 'react'

const Navbar = () => {
  return (
    <nav className="bg-orange-500 p-4 shadow-2xl sticky top-0 z-50"> 
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-white text-xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="text-white hover:text-orange-100">Dashboard</a>
          <button className="bg-white hover:bg-orange-100 text-orange-500 px-4 py-2 rounded-md">Logout</button>
        </div>
      </div>
    </nav>
  );
};


export default Navbar