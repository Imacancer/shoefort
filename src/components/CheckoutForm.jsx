import { DollarSign, ShoppingCart } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for HTTP requests

function CheckoutForm() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    
    fetchProductDetails();
  }, []); 

  const fetchProductDetails = async () => {
    try {
      // Fetch product details from the endpoint
      const response = await axios.get('http://localhost:4001/checkout/:id'); // Replace '/checkout/:id' with your actual endpoint
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="bg-white p-8">
      <div className="max-w-full mx-auto">
        <div className="flex justify-center">
          <div className="w-980 h-480 relative flex justify-center items-center border border-gray-300">
            {/* Product Image Container */}
            <img
              src={product?.imgUrl} // Display product image dynamically
              alt="Product"
              className="object-cover w-100 h-100"
              style={{ width: "980px", height: "480px", objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="text-center mt-4">
          {/* Product Name */}
          <h1 className="font-bold text-2xl text-black">{product?.product_name}</h1>
          {/* Product Category */}
          <p className="font-semibold text-lg text-black">Men's Shoes</p>
          {/* Color Buttons */}
          <div className="flex justify-center mt-4">
            {/* Map over colors and render buttons */}
            {product?.variants.map(variant => (
              <button
                key={variant.id}
                className={`w-10 h-10 rounded-full mr-2 ${selectedColor === variant.colors[0]?.value ? 'border-2 border-black' : ''}`}
                style={{ backgroundColor: variant.colors[0]?.value }}
                onClick={() => handleColorClick(variant.colors[0]?.value)}
              ></button>
            ))}
          </div>
          {/* Size Buttons */}
          <div className="flex justify-center mt-4">
            <button className="w-20 h-10 rounded-lg border border-gray-400 text-black  hover:bg-black hover:text-white transition duration-30">Small</button>
            <button className="w-20 h-10 rounded-lg border border-gray-400 text-black ml-2  hover:bg-black hover:text-white transition duration-30">Medium</button>
            {/* Add more size buttons as needed */}
          </div>
          {/* Padding */}
          <div className="mt-8"></div>
          {/* Price */}
          <p className="font-bold text-2xl text-black">{product?.variants[0]?.price} $</p>
          {/* Add to Cart and Checkout Buttons */}
          <div className="flex justify-center mt-4">
            <button className="flex items-center justify-center w-32 h-10 border border-black text-black rounded-lg hover:bg-black hover:text-white transition duration-300">
              <span>Add to Cart</span>
              <ShoppingCart />
            </button>
            <button className="flex items-center justify-center w-32 h-10 bg-black text-white rounded-lg ml-4 hover:bg-white hover:text-black transition duration-300">
              <span>Checkout</span>
              <DollarSign />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutForm;
