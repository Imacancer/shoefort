import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import { Navbar } from '../components';

const SuccessPage = () => {
    const location = useLocation(); // Use useLocation hook
    const { totalAmount, paymentMethod, name, address, cartItems } = location.state || {}; // Access location.state directly
    console.log('checkoutDetails:', name, address, paymentMethod, totalAmount, cartItems);
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <Navbar/>
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <div className="w-[800px] h-[600px] bg-slate-200 p-8 rounded-lg shadow-lg overflow-auto">
                    <div className="grid items-center justify-center gap-4">
                        <h1 className="font-montserrat text-[35px] font-bold text-center">Thank you for Purchasing</h1>
                        <p className="font-montserrat text-[25px] font-semibold">Name: {name}</p>
                        <p className="font-montserrat text-[25px] font-semibold">Address: {address}</p>
                        <p className="font-montserrat text-[25px] font-semibold">Payment Method: {paymentMethod}</p>
                        <p className="font-montserrat text-[25px] font-bold">Total Price: ${totalAmount}</p>
                        
                        {cartItems && cartItems.map((item, index) => (
                            <div key={index} className="flex items-center justify-between gap-2 p-4 bg-white rounded-lg shadow mb-4">
                                <img src={item.imgUrl} alt="Product" className="w-40 h-40"/>
                                <p className="font-montserrat text-[25px] font-bold">{item.product_name}</p>
                                <p className="font-montserrat text-[25px] font-bold">Item Price: ${item.price}</p>
                                <p className="font-montserrat text-[25px] font-bold">Item qty: {item.cartQuantity}</p>
                                <div className="w-8 h-8 rounded-full" style={{ backgroundColor: item.selectedColor }}></div>
                            </div>
                        ))}

                        <Link to='/' className="mt-4 px-6 py-2 bg-black text-white text-center rounded-[20px] hover:bg-white hover:text-black hover:border-black border-2 transition">
                            Back To Home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuccessPage;

