import React from "react";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition duration-300 ease-in-out">
      <img
        src={product.imgUrl}
        alt={product.product_name}
        className="w-full h-48 object-cover object-center rounded-t-lg"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {product.product_name}
        </h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.variants.map((variant) => (
            <div key={variant.id} className="bg-gray-200 rounded-md p-2">
              <p className="text-gray-800 font-semibold">
                Sizes: {variant.size}
              </p>
              <p className="text-gray-600">Price: ${variant.price}</p>
              <p className="text-gray-600">Quantity: {variant.qty}</p>
              <p className="text-gray-600">Category: {variant.category}</p>
              <div className="flex gap-1 mt-2">
                {variant.colors.map((color) => (
                  <div
                    key={color.id}
                    className="w-5 h-5 rounded-full bg-gray-300"
                    style={{ backgroundColor: color.value }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Buy now
          </button>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1h-10a.5.5 0 0 1-.5-.5zM8 8a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 8 8zm-1 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-.5-.5zm5 0a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-.5-.5z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
