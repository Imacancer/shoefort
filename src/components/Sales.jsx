import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Item from './utils/Item';
import Title from './utils/Title';
import CategoryDropdown from './categdropd';
import CheckoutForm from './CheckoutForm';

const Sales = ({ showDropdown, endpoint: { title } }) => {
  const [salesItems, setSalesItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4001/products');
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

  const handleCheckout = (productId) => {
    setSelectedProductId(productId); // Set the selected product ID for checkout
  };

  return (
    <>
      <div className='nike-container'>
        <Title title={title} />
        {showDropdown && (
          <div className='flex justify-center'>
            <CategoryDropdown />
          </div>
        )}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7   'grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1`}>
            {salesItems.map((item, i) => (
              <Item
                key={i}
                id={item.id}
                product_name={item.product_name}
                category={item.variants[0]?.category?.name || 'Unknown'} // Handle null category
                imgUrl={item.imgUrl}
                price={item.variants[0]?.price || 0} // Handle null price
                productId={item.id}
                onCheckout={handleCheckout}
              />
            ))}
          </div>
        )}
      </div>
      {selectedProductId && <CheckoutForm productId={selectedProductId} />}
    </>
  );
};

export default Sales;
