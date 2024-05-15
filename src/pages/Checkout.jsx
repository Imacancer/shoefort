import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CheckoutForm from '../components/CheckoutForm';
import useCartStore from '../app/cartStore.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { cartItems, setGetTotals, cartTotalAmount, customerId, setClearCartItems } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setGetTotals();
  }, [setGetTotals]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleProceed = async () => {
    try {
      const payload = {
        customerId,
        paymentMethod,
      };

      // Update transactions with the selected payment method and mark as completed
      await axios.patch('https://server-gilt-eta-18.vercel.app/transactions/update-transaction', payload);

      // Clear cart item

      // Navigate to success page with relevant data
      navigate('/SuccessPage', {
        state: {
          totalAmount: cartTotalAmount,
          paymentMethod,
          name: receiverName,
          address,
          cartItems: cartItems.length > 0 ? cartItems : null
        }
      });

      setClearCartItems();
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  console.log('customerId:', customerId);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <Navbar />
      <div className="container w-600 h-400 mx-auto pt-20 px-4 grid items-center justify-center overflow-auto">
        <div className="bg-slate-200 p-4 rounded-lg shadow-md overflow-auto" style={{ width: "800px", height: "300px" }}>
          {/* Map over cartItems and render CheckoutForm for each item */}
          {cartItems.map((item, index) => (
            <div key={item.id} className={`mb-8 ${index !== cartItems.length - 1 ? '' : ''}`}>
              <CheckoutForm item={item} />
            </div>
          ))}
        </div>
      </div>
      {/* Display totalAmount and the checkout form */}
      <div className="total-amount flex flex-col items-center justify-center mt-6">
        <div className='text-center font-montserrat text-2xl font-bold'>Total Amount: {cartTotalAmount}</div>
        <form className="mt-4 flex flex-col items-center">
          <input
            type="text"
            className="w-70 h-10 rounded-20 mb-4 px-2"
            placeholder="Receiver's Name"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
            style={{ width: "280px", height: "40px", borderRadius: "20px" }}
          />
          <input
            type="text"
            className="w-70 h-10 rounded-20 mb-4 px-2"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{ width: "280px", height: "40px", borderRadius: "20px" }}
          />
          <select
            className="w-70 h-10 rounded-20 mb-4 px-2"
            onChange={handlePaymentMethodChange}
            style={{ width: "280px", height: "40px", borderRadius: "20px" }}
          >
            <option value="">Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="gcash">Gcash</option>
            <option value="creditCard">Credit Card</option>
          </select>
          {(paymentMethod === 'gcash' || paymentMethod === 'creditCard') && (
            <input
              type="text"
              className="w-70 h-10 rounded-20 mb-4 px-2"
              placeholder="Enter Account Number"
              style={{ width: "280px", height: "40px", borderRadius: "20px" }}
            />
          )}
          <div className="flex justify-center mt-4 space-x-4">
            <button
              type="button"
              className="flex justify-center items-center bg-black text-white font-montserrat py-2 px-6 rounded-20 mb-4 hover:bg-white hover:text-black border-2 border-black"
              style={{ borderRadius: '20px' }}
              onClick={handleProceed}
            >
              Proceed
            </button>
            <button
              type="button"
              className="flex justify-center items-center bg-white text-black font-montserrat py-2 px-6 rounded-20 mb-4 hover:bg-black hover:text-white border-2 border-black"
              style={{ borderRadius: '20px' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
