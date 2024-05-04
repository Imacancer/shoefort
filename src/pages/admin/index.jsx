import React, { useState } from 'react'
import Navbar from '@components/admin/Navbar'
import Sidebar from '@components/admin/Sidebar'
import UserPage from './userPage'
import PostPage from './postPage'
const Dashboard = () => {
const [selectedMenuItem, setSelectedMenuItem] = useState(null);
const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };


  return (

    <div>
        <Navbar />
       <div className='flex'>

            <Sidebar onMenuItemClick={handleMenuItemClick} />

            <div className="flex-grow bg-gray-200 p-8">
                {selectedMenuItem === 'Manage Users' && <UserPage />}
                {selectedMenuItem === 'Manage Posts' && <PostPage />}
            </div>
       </div>
    </div>
  )
}

export default Dashboard