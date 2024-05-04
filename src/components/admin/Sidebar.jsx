import React from 'react';
import logo from '../../assets/shoefortnewlogo.png';
import { FaUser, FaNewspaper } from 'react-icons/fa';

const Sidebar = ({onMenuItemClick}) => {
  const handleItemClick = (menuItem) => {
    onMenuItemClick(menuItem);
  };
  return (
    <div className="bg-gray-800 h-screen w-64 flex flex-col justify-between">
    <div className="p-4">
      <div className="flex items-center justify-center mb-8">
        <img src={logo} alt="Logo" className="w-20 mr-2 h-20" />
      </div>
      <ul>
        <li className="text-white mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => handleItemClick('Manage Users')}>
        <FaUser className="mr-1" />
          Manage Users
        </li>
        <li className="text-white mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => handleItemClick('Manage Posts')}>
         <FaNewspaper className="mr-1" /> {/* Icon for managing posts */}
          Manage Posts
        </li>
      </ul>
    </div>
  </div>
  )
}

export default Sidebar