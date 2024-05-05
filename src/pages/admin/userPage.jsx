import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "name", headerName: "Name", width: 200, sortable: true }, // Make the "Name" column sortable
  { field: "email", headerName: "Email", width: 300 },
  { field: "role", headerName: "Role", width: 200 },
  { field: "createdAt", headerName: "Date Created", width: 300 },
];

const userPage = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4001/customers");
        const data = await response.json();
        // Adapt data to fit the expected format
        const adaptedData = data.map((item) => ({
          id: item.id,
          name: item.user.name,
          email: item.user.email,
          role: item.user.role,
          createdAt: item.user.createdAt,
        }));
        setRows(adaptedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
};

export default userPage;
