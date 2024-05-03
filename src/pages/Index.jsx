import React,{useEffect} from 'react';
import { Cart, FlexContent, Footer, Hero, Navbar, Sales, Stories } from "../components";
import { heroapi, popularsales, toprateslaes, highlight, sneaker, story, footerAPI } from '../data/data.js';
import { useNavigate } from'react-router-dom';

const index = () => {

  const navigate = useNavigate(); // Use useNavigate hook within functional component

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
      navigate('/Login'); // Use navigate to redirect
    }
  }, [navigate]);
  

  return (
   <>
      <Navbar/>
      <Cart />
      <main className='flex flex-col gap-16 relative'>
        <Hero heroapi={heroapi} />
        <Sales endpoint={popularsales} ifExists />
        <FlexContent endpoint={highlight} ifExists />
        <Sales endpoint={toprateslaes} />
        <FlexContent endpoint={sneaker} />
        <Stories story={story} />
      </main>
      <Footer footerAPI={footerAPI} />
   </>
  )
}

export default index;
