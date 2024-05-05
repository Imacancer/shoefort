import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "@components/admin/Navbar";
import Sidebar from "@components/admin/Sidebar";
import UserPage from "./userPage";
import ProductPage from "./productPage";
const Dashboard = () => {
  const navigate = useNavigate(); // Use useNavigate hook within functional component

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null && token.role !== "admin") {
      navigate("/Login"); // Use navigate to redirect
    }
  }, [navigate]);

  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar onMenuItemClick={handleMenuItemClick} />

        <div className="flex-grow bg-gray-200 p-8">
          {selectedMenuItem === "Manage Users" && <UserPage />}
          {selectedMenuItem === "Manage Posts" && <ProductPage />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
