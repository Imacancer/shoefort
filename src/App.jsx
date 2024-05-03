import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import Products from './pages/Products';
import SignIn from './pages/sign-in';

import LoadingSpinner from './components/Loading';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <BrowserRouter>
    {loading ? (<LoadingSpinner loading={loading} />):(
      
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/Login" element={<Login loading={setLoading} />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    )}
    </BrowserRouter>
  );
}

export default App;
