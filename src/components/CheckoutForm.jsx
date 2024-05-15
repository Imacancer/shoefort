import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';
import useCartStore from '../app/cartStore.js';

function CheckoutForm({ item }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const cartItems = useCartStore(state => state.cartItems);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  console.log('items:', item);
  console.log('selectedColor:', selectedColor);

  return (
    <div className="card-container w-280 h-302 bg-white rounded-lg shadow-md p-20 overflow-auto">
      <div className="max-w-full mx-auto">
        <div className="flex justify-center">
          <div className="w-48 h-48 relative flex justify-center items-center border border-gray-300">
            <img
              src={item.imgUrl}
              alt="Product"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-center ml-8">
            <h1 className="font-bold text-2xl text-black">{item.product_name}</h1>
            <div className="mt-8"></div>
            <p className="font-bold text-2xl text-black">{item.price} $</p>
            <div className="mt-8"></div>
            <p>Quantity: {item.cartQuantity}</p>
            <div className="flex justify-center mt-4">
              {item.color &&item.color.map((color, index) => (
                <button
                  key={index}
                  className="w-10 h-10 rounded-full"
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorClick(color)}
                ></button>
              ))}
            </div>
            {/* Display selected color */}
            <p className="mt-4">{selectedColor}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
