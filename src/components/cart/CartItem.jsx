import React, { useState, useEffect } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { setDecreaseItemQTY, setIncreaseItemQTY, setRemoveItemFromCart } from "../../app/CartSlice.js";
import axios from "axios";

const CartItem = ({ item: { id, product_name, imgUrl, productId, cartQuantity } }) => {
  const dispatch = useDispatch();
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    // Fetch variants for the selected product
    const fetchVariants = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/products/${productId}`);
        setVariants(response.data);
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };

    fetchVariants();
  }, [productId]);

  const onRemoveItem = () => {
    dispatch(setRemoveItemFromCart({ id, product_name, imgUrl, productId, cartQuantity }));
  };

  const onIncreaseItemQTY = () => {
    dispatch(setIncreaseItemQTY({ id, product_name, imgUrl, productId, cartQuantity }));
  };

  const onDecreaseItemQTY = () => {
    dispatch(setDecreaseItemQTY({ id, product_name, imgUrl, productId, cartQuantity }));
  };

  const handleVariantChange = (e) => {
    setSelectedVariant(e.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full px-5">
        <div className="flex items-center gap-5">
          <div className={`bg-gradient-to-b ${selectedVariant?.color} ${selectedVariant?.shadow} relative rounded p-3 hover:scale-105 transition-all duration-75 ease-in-out grid items-center`}>
            <img src={imgUrl} alt={`img/cart-item/${id}`} className="w-36 h-auto object-fill lg:w-28" />
            <div className='absolute right-1 top-1 blur-theme-effect bg-white/80 text-black text-xs px-1 rounded'>₱{selectedVariant?.price}</div>
          </div>
          <div className="grid items-center gap-4">
            <div className="grid items-center leading-none">
              <h1 className="font-medium text-lg text-slate-900 lg:text-sm">{product_name}</h1>
            </div>
            <div className="flex items-center justify-around w-full">
              <select className="bg-theme-cart rounded text-white font-medium lg:text-xs w-36 h-8 lg:w-28" onChange={handleVariantChange}>
                <option value="">Select Variant</option>
                {variants.map((variant) => (
                  <option key={variant.id} value={variant}>{variant.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="grid items-center gap-5">
          <div className="grid items-center justify-center">
            <h1 className="text-lg lg:text-base text-slate-900 font-medium">₱{selectedVariant ? selectedVariant.price * cartQuantity : 0}</h1>
          </div>
          <div className="grid items-center justify-center">
            <button type="button" className="bg-theme-cart rounded p-1 lg:p-0.5 grid items-center justify-items-center cursor-pointer" onClick={onRemoveItem}>
              <TrashIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
