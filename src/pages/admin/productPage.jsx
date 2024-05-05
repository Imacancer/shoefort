import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  {
    field: "product_name",
    headerName: "Product Name",
    width: 200,
    sortable: true,
  },
  { field: "featured", headerName: "Featured", width: 300 },
  { field: "status", headerName: "Status", width: 200 },
  {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <button
        onClick={() => params.handleDelete(params.row.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        Delete
      </button>
    ),
  },
];

const ProductPage = () => {
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    product_name: "",
    status: true,
    featured: false,
    imgUrl: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4001/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const adaptedData = data.map((item) => ({
          id: item.id,
          product_name: item.product_name,
          featured: item.featured,
          status: item.status,
        }));
        setRows(adaptedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCreateProduct = () => {
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4001/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const newData = await response.json();
      const updatedRows = [...rows, newData];
      setRows(updatedRows);
      setShowModal(false);
      setFormData({
        product_name: "",
        status: true,
        featured: false,
        imgUrl: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `http://localhost:4001/products/${productId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      const updatedRows = rows.filter((row) => row.id !== productId);
      setRows(updatedRows);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Define a function to create renderCell functions with captured handleDelete
  const createRenderCell = (handleDelete) => (params) =>
    (
      <button
        onClick={() => handleDelete(params.row.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >
        Delete
      </button>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreateProduct}
        >
          Add Product
        </button>
      </div>

      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="relative bg-white w-96 rounded-lg shadow-lg">
            <div className="px-6 py-4">
              <div className="mb-4">
                <label
                  htmlFor="product_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="product_name"
                  id="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  className="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

              {/* Add more form fields based on your schema here */}

              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="featured"
                  className="block text-sm font-medium text-gray-700"
                >
                  Featured
                </label>
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="mt-1 p-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>

              {/* Add more form fields based on your schema here */}
            </div>

            <div className="px-6 py-4 bg-gray-100 flex justify-end items-center">
              <button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns.map((column) => ({
            ...column,
            renderCell: column.renderCell
              ? createRenderCell(handleDelete)
              : undefined,
          }))}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default ProductPage;
