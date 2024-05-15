import React, { useEffect, useState } from "react";
import useCartStore from "../../app/cartStore";
import { PlusIcon, MinusIcon } from "lucide-react";
import toast from "react-hot-toast";

const ItemCart = ({ item, id }) => {
  const { product_name, imgUrl, qty } = item;
  const { setIncreaseItemQTY, setDecreaseItemQTY, setGetTotals, cartItems, variantQuantities } = useCartStore();
  const [variantQty, setVariantQty] = useState(qty); // Initialize with default quantity

  // Find the current item in the store to always have the latest data
  const currentItem = cartItems.find(cartItem => cartItem.id === id);

  const handleIncrease = () => {
    if ((currentItem ? currentItem.cartQuantity : 1) < qty) {
      setIncreaseItemQTY(id);
      setVariantQty((prevQty) => prevQty - 1);
    } else {
      toast.error("Cannot increase quantity. Maximum quantity reached.");
    }
  };
  
  const handleDecrease = () => {
    if ((currentItem ? currentItem.cartQuantity : 0) > 1) {
      setDecreaseItemQTY(id);
      setVariantQty((prevQty) => prevQty + 1);
    } else {
      toast.error("Cannot decrease quantity. Minimum quantity reached.");
    }
  };
  

  useEffect(() => {
    setGetTotals();
  }, [cartItems]);

  // Update variantQty when currentItem changes
  useEffect(() => {
    if (currentItem) {
      // Calculate available quantity by subtracting cart quantity from the initial variant quantity
      const availableQty = qty - (currentItem.cartQuantity || 0);
      setVariantQty(availableQty);
    }
  }, [currentItem, qty]);

  if (!currentItem) return null; // If item is not found, return null

  return (
    <div className="cart-item-container grid items-center justify-center bg-white w-80 h-80 border-b border-gray-200 p-2">
      <div className="w-42 h-45">
        <img src={imgUrl} alt={product_name} className="w-45   h-40" />
      </div>
      <div className="flex flex-col justify-center text-center text-black">
        <div className="font-bold text-xl">{product_name}</div>
        <div className="font-semibold text-sm">{`$${currentItem.price * currentItem.cartQuantity}`}</div>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <button className="w-6 h-6 border border-black" onClick={handleDecrease}>
          <MinusIcon />
        </button>
        <span className="text-black text-xs">{currentItem.cartQuantity}</span>
        <button className="w-6 h-6 border border-black" onClick={handleIncrease}>
          <PlusIcon />
        </button>
      </div>
      <div className="text-xs text-gray-500">Available: {variantQty}</div> {/* Display variant qty */}
    </div>
  );
};

export default ItemCart;
