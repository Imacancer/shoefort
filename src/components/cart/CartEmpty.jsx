import React from 'react'
import emptybag from '../../assets/orangecart.png';
import { ArrowLeftIcon  } from '@heroicons/react/24/outline';

const CartEmpty = ({ onCartToggle }) => {
  return (
   <>
      <div className='flex items-center justify-center flex-col h-screen px-11 text-center gap-7'>
        <img
          src={emptybag}
          alt="emptybag/img"
          className='w-40 lg:w-36 sm:w-28 h-auto object-fill transition-all duration-300 hover:scale-110'
        />
        <button type='button' className='button-theme bg-orange-500 shadow-lg flex items-center justify-center text-white py-2 gap-3 text-sm px-5 font-semibold active:scale-110' onClick={onCartToggle}>
            <ArrowLeftIcon className='w-5 h-5 text-white' />
            <span className=''>BACK TO SHOEFORT STORE</span>
        </button>
      </div>
   </>
  )
}

export default CartEmpty