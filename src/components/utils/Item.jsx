import React, { useState, useEffect } from "react";
import { StarIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import useCartStore from "../../app/cartStore"; // Adjust the path accordingly
import toast from "react-hot-toast";

const Item = ({ id, product_name, imgUrl, productId, onCheckout, onOpenModal }) => {
  const [selectedSize, setSelectedSize] = useState(""); 
  const [sizes, setSizes] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  useEffect(() => {
    const fetchSizes = async () => {
      try {
        const response = await fetch(`https://shoefort.vercel.app/products/${productId}`);
        const variants = await response.json();
        const sizes = variants.map(variant => variant.size);
        setSizes(sizes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    fetchSizes();
  }, [productId]);

  const addToCart = useCartStore(state => state.setAddItemToCart); // Using the setAddItemToCart action

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
  
    try {
      const response = await fetch(`https://shoefort.vercel.app/products/${productId}`);
      const variants = await response.json();
      const variant = variants.find(variant => variant.size === selectedSize);
      
      if (!variant) {
        console.error("Variant not found");
        return;
      }
      
      const newItem = { 
        id, 
        product_name, 
        imgUrl, 
        productId,
        selectedSize,
        price: variant.price,
        qty: variant.qty, 
        color: variant.colors[0]?.value,
        cartQuantity: 1
      };
  
      addToCart(newItem, productId, selectedSize); // Pass selectedSize as an argument
      console.log("cart added", newItem);
      setIsModalOpen(true);
      onOpenModal(true);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleBuyNow = async () => {
    if (!selectedSize) {
      console.error("Please select a size");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4001/products/${productId}`);
      const variants = await response.json();
      const variant = variants.find(variant => variant.size === selectedSize);
      
      if (!variant) {
        console.error("Variant not found");
        return;
      }
      
      const newItem = { 
        id, 
        product_name, 
        imgUrl, 
        productId,
        selectedSize,
        price: variant.price,
        qty: variant.qty, 
        color: variant.colors[0]?.value,
        cartQuantity: 1
      };

      addToCart(newItem);
      onCheckout(productId, newItem);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="relative bg-transparent border-2 border-black grid items-center h-56 rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full hover:scale-105">
      <div className="grid items-center">
        <h1 className="text-black text-xl lg:text-lg md:text-base font-medium">
          {product_name}
        </h1>

        <div className="flex items-center gap-1">
          <StarIcon className="icon-style-star w-5 h-5 md:w-4 md:h-4" />
          <h1 className="md:text-sm font-normal text-black">5 out of 5</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative bg-white/90 blur-effect-theme button-theme p-0.5 shadow shadow-sky-200"
            onClick={handleAddToCart}
          >
            <span className="relative hover:text-white">
              <ShoppingBagIcon className="icon-style text-slate-900" />
              Add to Cart
            </span>
          </button>
        </div>
      </div>
      <div className="flex items-center absolute top-5 right-1">
        <img
          src={imgUrl}
          alt={`img/item-img/${id}`}
          className="transitions-theme hover:-rotate-12 h-auto w-64 lg:w-56 md:w-48"
        />
      </div>
      {!loading && (
        <div className="flex absolute bottom-5 left-5">
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="bg-white/90 button-theme px-2 py-1 shadow text-black"
          >
            <option value="">Select Size</option>
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default Item;
