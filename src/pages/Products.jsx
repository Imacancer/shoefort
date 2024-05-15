import React, { useState, useEffect } from 'react';
import { Navbar } from "@components";
import axios from 'axios';
import { useNavigate } from'react-router-dom';
import CartModal from '../components/cart/CartModal.jsx';
import Title from '../components/utils/Title.jsx';
import Item from '../components/utils/Item.jsx';
import { toprateslaes, popularsales } from '../data/data.js';



const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salesItems, setSalesItems] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };
  const handleCheckout = (productId, newItem) => {
    // Handle checkout logic here
  };


  const navigate = useNavigate(); // Use useNavigate hook within functional component

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const customerId = sessionStorage.getItem('customerId');
    console.log(token);
    console.log(customerId);
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://server-gilt-eta-18.vercel.app/products');
        setSalesItems(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>  
      <Navbar/>
      <div className="container mx-auto px-4">
      <div className='nike-container'>
          <Title title={popularsales.title} />
          <div className='flex justify-center'>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7   'grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1`}>
              {salesItems.map((item) => (
                <Item
                  key={item.id}
                  item={item}
                  id={item.id}
                  product_name={item.product_name}
                  category={item.variants[0]?.category?.name || 'Unknown'} // Handle null category
                  imgUrl={item.imgUrl}
                  price={item.variants[0]?.price || 0} // Handle null price
                  productId={item.id}
                  onCheckout={handleCheckout}
                  onOpenModal={handleOpenModal} // Pass function to open modal
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <CartModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default Products;
