import React from 'react'
import Navbar from '../components/Navbar'
import CheckoutForm from '../components/CheckoutForm'

function Checkout() {
  return (
    <div>
        <Navbar />
        <div className="container mx-auto pt-20 px-4">
            <CheckoutForm />
        </div>
    </div>
  )
}

export default Checkout