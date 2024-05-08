import React from "react";
import { useDispatch } from "react-redux";
import { StarIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import { setAddItemToCart, setOpenCart } from "../../app/CartSlice";

const Item = ({ id, product_name, imgUrl, productId, onCheckout }) => {
  const dispatch = useDispatch();

  const onAddToCart = () => {
    const item = { id, product_name, imgUrl, productId };
    console.log(item);
    dispatch(setAddItemToCart(item));
  };

  const onCartToggle = () => {
    dispatch(setOpenCart({ cartState: true }));
  };

  const handleBuyNow = () => {
    onAddToCart();
    onCartToggle();
    onCheckout(productId, item); // Passing the productId to the onCheckout function
  };

  return (
    <div className="relative bg-transparent border-2 border-black grid items-center rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full hover:scale-105">
      <div className="grid items-center">
        <h1 className="text-black text-xl lg:text-lg md:text-base font-medium ">
          {product_name}
        </h1>

        <div className="flex items-center justify-between w-28 my-2">
          <div className="flex items-center gap-1">
            <StarIcon className="icon-style-star w-5 h-5 md:w-4 md:h-4" />
            <h1 className="md:text-sm font-normal text-black">5 out of 5</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="bg-white/90 blur-effect-theme button-theme p-0.5 shadow shadow-sky-200"
            onClick={onAddToCart}
          >
            <ShoppingBagIcon className="icon-style text-slate-900" />
          </button>
          <button
            type="button"
            className="bg-white/90 button-theme px-2 py-1 shadow text-black"
            onClick={handleBuyNow}
          >
            Buy Now!
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
    </div>
  );
};

export default Item;
