import React, { useState, useEffect } from "react";
import useCartStore from "../../app/cartStore";
import ItemCart from "./Citem";
import { TrashIcon, XIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartModal = ({ isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const { cartItems, cartTotalAmount, setClearCartItems, setGetTotals, createTransaction   } = useCartStore();
  const navigate = useNavigate();


  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);


  const handleCheckout = async () => {

    const token = sessionStorage.getItem("token");
    if (!token) {
      // If no token, redirect to login page
      navigate("/login");
      return;
    }


    // Navigate to Checkout page and pass cartItems and cartTotalAmount as state
    navigate("/checkout", { state: { cartItems, totalAmount: cartTotalAmount } });
    await createTransaction();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    onClose();
    
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };


  useEffect(() => {
    // Call setGetTotals whenever cartTotalAmount changes
    setGetTotals();
  }, [cartTotalAmount, setGetTotals]);

  return (
    <div className={`fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 ${isOpen ? 'block': 'hidden'}`} onClick={onClose}>
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white h-120 w-96 p-8 rounded-lg" onClick={stopPropagation}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-center font-bold text-2xl">Cart</h2>
            <button className="w-8 h-8 text-black" onClick={handleCloseModal}>
              <XIcon />
            </button>
          </div>
          <div className="cart-items-container flex-1 overflow-auto max-h-80 pb-15 space-y-4">
            <div className="cart-items">
              {cartItems.map((item) => (
                <ItemCart key={item.id} item={item} id={item.id} />
              ))}
            </div>
          </div>
          <div className="cart-total text-center font-bold my-4">Total: ${cartTotalAmount}</div>
          <div className="flex justify-between space-x-2">
            <button className="w-40 h-10 bg-black text-white rounded-md hover:bg-white hover:text-black border border-black" onClick={handleCheckout}>
              Checkout
            </button>
            <button className="flex items-center justify-center w-40 h-10 bg-black text-white rounded-md hover:bg-white hover:text-black border border-black" onClick={setClearCartItems}>
              <TrashIcon className="w-4 h-4 mr-2" />
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
