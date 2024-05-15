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
    width: 300,
    sortable: false,
    renderCell: (params) => (
      <>
        <button
          onClick={() => params.handleDelete(params.row.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
        >
          Delete
        </button>
        <button
          onClick={() => params.handleAddVariant(params.row.id)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
        >
          Add Variant
        </button>
      </>
    ),
  },
];

const createRenderCell = (handleDelete, handleAddVariant) => (params) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <button
      onClick={() => handleDelete(params.row.id)}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
    >
      Delete
    </button>
    <button
      onClick={() => handleAddVariant(params.row.id)}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
    >
      Add Variant
    </button>
  </div>
);

const ProductPage = () => {
  const [rows, setRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddVariantForm, setShowAddVariantForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [formData, setFormData] = useState({
    product_name: "",
    status: true,
    featured: false,
    file: null, // Store the file
  });
  const [variantFormData, setVariantFormData] = useState({
    price: "",
    size: "",
    Category: "",
    color: "",
    status: true,
    qty: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://server-gilt-eta-18.vercel.app/products");
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
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: newValue
    }));
  };

  const handleFileChange = (e) => {
    console.log("File selected");
    setFormData({ ...formData, file: e.target.files[0] });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Create a plain object with the form data and stringify it
      formDataToSend.append("product_name", formData.product_name);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("featured", formData.featured);
  
      // Append the file separately
      formDataToSend.append("file", formData.file);
  
      console.log(formDataToSend);
  
      const response = await fetch("https://server-gilt-eta-18.vercel.app/products", {
        method: "POST",
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
      const newData = await response.json();
      const updatedRows = [...rows, newData];
      setRows(updatedRows);
      setShowModal(false);
      // setFormData({
      //   product_name: "",
      //   status: true,
      //   featured: false,
      //   file: null,
      // });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };


  const handleDelete = async (productId) => {
    try {
      const response = await fetch(
        `https://server-gilt-eta-18.vercel.app/${productId}`,
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

  const handleAddVariant = async (productId) => {
    console.log("Adding variant for product ID:", productId);
    setSelectedProductId(productId);
    setShowAddVariantForm(true);
  };

  const handleVariantFormSubmit = async (productId, e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://server-gilt-eta-18.vercel.app/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variantFormData),
      });
      if (!response.ok) {
        throw new Error("Failed to add variant");
      }
      const newVariant = await response.json();
      console.log("New variant added:", newVariant);
      setShowAddVariantForm(false);
    } catch (error) {
      console.error("Error adding variant:", error);
    }
  };
  

  // Define a function to create renderCell functions with captured handleDelete and handleAddVariant
  const createRenderCell = (handleDelete, handleAddVariant) => (params) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={() => handleDelete(params.row.id)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mr-2"
      >
        Delete
      </button>
      <button
        onClick={() => handleAddVariant(params.row.id)}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
      >
        Add Variant
      </button>
    </div>
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

              <div className="mb-4">
                <label
                  htmlFor="file"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  id="file"
                  onChange={handleFileChange}
                  className="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>

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

      {showAddVariantForm && (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
          <div className="relative bg-white w-96 rounded-lg shadow-lg">
            <div className="px-6 py-4">
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  value={variantFormData.price}
                  onChange={(e) => setVariantFormData({ ...variantFormData, price: e.target.value })}
                  className="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                  Size
                </label>
                <input
                  type="text"
                  name="size"
                  id="size"
                  value={variantFormData.size}
                  onChange={(e) => setVariantFormData({ ...variantFormData, size: e.target.value })}
                  className="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  id="color"
                  value={variantFormData.color}
                  onChange={(e) => setVariantFormData({ ...variantFormData, color: e.target.value })}
                  className="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="Category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  id="Category"
                  name="Category"
                  value={variantFormData.Category}
                  onChange={(e) => setVariantFormData({ ...variantFormData, Category: e.target.value })}
                  className="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                >
                  <option value='Mens'>Mens</option>
                  <option value='Womens'>Womens</option>
                  <option value='Kids'>Kids</option>
                  
                </select>
              </div>
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <input
                  type="checkbox"
                  id="status"
                  name="status"
                  checked={variantFormData.status}
                  onChange={(e) => setVariantFormData({ ...variantFormData, status: e.target.checked })}
                  className="mt-1 p-1 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="qty" className="block text-sm font-medium text-gray-700">
                  Qty
                </label>
                <input
                  type="text"
                  name="qty"
                  id="qty"
                  value={variantFormData.qty}
                  onChange={(e) => setVariantFormData({ ...variantFormData, qty: e.target.value })}
                  className="mt-1 p-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-100 flex justify-end items-center">
              <button
                onClick={(e) => handleVariantFormSubmit(selectedProductId, e)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setShowAddVariantForm(false)}
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
              ? createRenderCell(handleDelete, handleAddVariant)
              : undefined,
              handleAddVariant: handleAddVariant,
          }))}
          pageSize={5}
          checkboxSelection
        />
      </div>
    </div>
  );
};

export default ProductPage;
