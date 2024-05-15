import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FlexContent, Footer, Hero, Navbar, Stories } from "../components";
import { heroapi, popularsales, toprateslaes, highlight, sneaker, story, footerAPI } from '../data/data.js';
import { useNavigate } from'react-router-dom';
import useCartStore from '../app/cartStore';
import Item from '../components/utils/Item.jsx';
import Title from '../components/utils/Title.jsx';
import CategoryDropdown from '../components/categdropd.jsx';
import CartModal from '../components/cart/CartModal.jsx';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [salesItems, setSalesItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartItems, setAddItemToCart } = useCartStore();
  const navigate = useNavigate(); // Use useNavigate hook within functional component

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const customerId = sessionStorage.getItem('customerId');
    console.log(token);
    console.log(customerId);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://shoefort.vercel.app/products');
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
  };

  const handleCheckout = (productId, newItem) => {
    // Handle checkout logic here
  };

  return (
    <>
      <Navbar/>
      <main className='flex flex-col gap-16 relative'>
        <Hero heroapi={heroapi} />
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
        <FlexContent endpoint={highlight} ifExists />
        <div className='nike-container'>
          <Title title={toprateslaes.title} />
        </div>
        <FlexContent endpoint={sneaker} />
        <Stories story={story} />
      </main>
      <CartModal isOpen={isModalOpen} onClose={handleCloseModal} cartItems={cartItems} />
      <Footer footerAPI={footerAPI} />
    </>
  );
}

export default Index;
