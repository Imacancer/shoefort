import React,{useEffect} from 'react';
import { Cart, Navbar, Categories, Sales } from "../components";
import { threecategories, toprateslaes } from '../data/data.js';

import { useNavigate } from'react-router-dom';

const Products = () => {

  const navigate = useNavigate(); // Use useNavigate hook within functional component

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      navigate('/Login'); // Use navigate to redirect
    }
  }, [navigate]);


  return (
    <div>  
      <Navbar/>
      <Cart />
      <div className='pb50'></div>
      <div className='flex flex-col gap-16 relative'>
        
        <Sales endpoint={toprateslaes} showDropdown={true} />
      </div>
    </div>
  );
}

export default Products;
