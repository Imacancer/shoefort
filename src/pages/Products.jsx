import React, { useState, useEffect } from 'react';
import { Cart, Navbar } from "@components";

import { useNavigate } from'react-router-dom';
import ProductCard from '@components/ProductCard';



const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await fetch('http://localhost:4001/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }

    fetchProductData();
  }, []);


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
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-4 gap-4 mt-32">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
