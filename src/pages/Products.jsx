import React from 'react';
import { Cart, Navbar, Categories } from "../components";
import { threecategories } from '../data/data.js';
const products = () => {
  return (
   <>  
      <Navbar/>
      <Cart />
      <main className='flex flex-col gap-16 relative'>
        <Categories endpoint={threecategories} ifExists />
      </main>
   </>
  )
}

export default products;