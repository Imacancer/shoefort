import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "name", headerName: "Name", width: 200, sortable: true }, // Make the "Name" column sortable
  { field: "email", headerName: "Email", width: 300 },
];

const userPage = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4001/customers"); // Replace 'your-api-url' with your actual API endpoint
        const data = await response.json();
        setRows(data); // Set the fetched data to the 'rows' state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, []);
  return (
    <div>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default userPage;
