import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectTotalQTY, setOpenCart } from '../app/CartSlice.js';
import { Bars3Icon } from '@heroicons/react/24/outline';
import logo from '../assets/shoefortnewlogo.png';
import { CircleUserRound, LogInIcon, ShoppingCart } from 'lucide-react';
import axios from 'axios';

const Navbar = ({setLoading}) => {
    const [navState, setNavState] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showMobileNav, setShowMobileNav] = useState(false);
    const dispatch = useDispatch();
    const totalQTY = useSelector(selectTotalQTY);
    const navigate = useNavigate();
    const location = useLocation(); 
    const isHomePage = location.pathname === '/';
    const isProductsPage = location.pathname === '/Products';
    const handleLoginClick = () => {
        // Navigate to the Login page
        navigate('/Login');
    }; 
    const onCartToggle = () => {
        dispatch(setOpenCart({
            cartState: true
        }));
    };

    const onNavScroll = () => {
        if (window.scrollY > 30) {
            setNavState(true);
        } else {
            setNavState(false);
        }
    };

    const checkIsMobile = () => {
        if (window.innerWidth <= 640) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', onNavScroll);
        window.addEventListener('resize', checkIsMobile);

        checkIsMobile();

        return () => {
            window.removeEventListener('scroll', onNavScroll);
            window.removeEventListener('resize', checkIsMobile);
        };
    }, []);

    const toggleMobileNav = () => {
        setShowMobileNav(!showMobileNav);
    };

    const handleLogoutClick = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                // Handle case where token is not available
                return;
            }
    
            const response = await axios.post('http://localhost:4001/logout', {}, {
                headers: {
                    Authorization: token
                }
            });
    
            if (response.status === 200) {
                // Clear token from localStorage upon successful logout
                localStorage.removeItem('token');
                navigate('/login');
            }
        } catch (error) {
            console.error('Failed to logout:', error);
            // Handle error
        }
    };

    return (
        <>
            <header className={!navState ? 'fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme' : 'fixed top-0 left-0 right-0 h-[9vh] flex items-center justify-center opacity-100 z-[200] blur-effect-theme'}>
                <nav className={`flex items-center justify-between nike-container`}>
                    <div className='flex items-center'>
                        <img src={logo} alt="logo/img" className={`w-16 h-auto ${navState && "filter brightness-0"}`} />
                    </div>
                    <div className={`flex items-left ${isMobile ? 'justify-center' : 'items-center justify-center gap-11'}`}>
                        {isMobile ? (<button></button>) : (
                            <ul className='flex items-center justify-center gap-14'>
                                <li className='grid items-center'>
                                   <Link to='/' onClick={() => setLoading(true)} className={`nav-link ${navState ? "transition-all duration-300" : ""} ${isHomePage ? 'home-active' : ''}`} style={{ fontWeight: 600 }}>Home</Link>
                                </li>
                                <li className='grid items-center'>
                                    <Link to='/Products' onClick={() => setLoading(true)} className={`nav-link ${navState ? "transition-all duration-300" : ""} ${isProductsPage ? 'home-active' : ''}`} style={{ fontWeight: 600 }}>Products</Link>
                                </li>
                                <li className='grid items-center'>
                                    <a href="#services" className={`nav-link ${navState && "transition-all duration-300"}`} style={{ fontWeight: 600 }}>Services</a>
                                </li>
                                <li className='grid items-center'>
                                    <a href="#about" className={`nav-link ${navState && "transition-all duration-300"}`} style={{ fontWeight: 600 }}>About</a>
                                </li>
                                <li className='grid items-center'>
                                    <a href="#help" className={`nav-link ${navState && "transition-all duration-300"}`} style={{ fontWeight: 600 }}>Help</a>
                                </li>
                            </ul>
                        )}
                    </div>
                    <ul className='flex items-center justify-center gap-4'>
                    <div className={`flex items-left ${isMobile ? 'justify-center' : 'items-center justify-center gap-4'}`}>
                        {isMobile ? (<button type='button' onClick={toggleMobileNav} className='border-none outline-none active:scale-110 transition-all duration-300 relative'><Bars3Icon className={`icon-style ${navState && "text-gray-800 transition-all duration-300"}`} /></button>) : (<ul></ul>)}
                    </div>
                        <li className='grid items-center'>
                            <CircleUserRound className={`icon-style ${navState && "text-gray-800 transition-all duration-300"}`} />
                        </li>
                        <li className='grid items-center'>
                            <button type='button' onClick={onCartToggle} className='border-none outline-none active:scale-110 transition-all duration-300 relative'>
                            <ShoppingCart className={`icon-style ${navState && "text-gray-800 transition-all duration-300"}`} />
                            <div className={`absolute top-4 right-0 shadow w-4 h-4 text-[0.65rem] leading-tight font-medium rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 ${navState ? 'bg-orange-600 text-slate-100 shadow-slate-900' : 'bg-orange-600 text-white shadow-slate-900'}`}>{totalQTY}</div>
                            </button>
                        </li>
                        <li className='grid items-center'>
                            <button onClick={handleLogoutClick}>
                                <LogInIcon className={`icon-style ${navState && "text-gray-800 transition-all duration-300"}`} />
                            </button>
                        </li>
                        </ul>
                    </nav>
                {isMobile && showMobileNav && (
                    <div className="flex items-center justify-center transition ease-out duration-100">
                             <ul>
                        <div class="absolute right-10 z-10 mt-2 w-30 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                          <div class="py-1" role="none">
                          <button onClick={handleIndexClick}  className="text-gray-800 transition-all duration-300 block px-4 py-2 text-sm" style={{ fontWeight: 600 }}>Home</button>
                          <button onClick={handleProductsClick} className="text-gray-800 transition-all duration-300 block px-4 py-2 text-sm" style={{ fontWeight: 600 }}>Products</button>
                          <button className="text-gray-800 transition-all duration-300 block px-4 py-2 text-sm" style={{ fontWeight: 600 }}>Services</button>
                          <button className="text-gray-800 transition-all duration-300 block px-4 py-2 text-sm" style={{ fontWeight: 600 }}>About</button>
                          <button className="text-gray-800 transition-all duration-300 block px-4 py-2 text-sm" style={{ fontWeight: 600 }}>Help</button>
                               </div>
                            </div>
                        </ul>
                    </div>
                )}
            </header>
        </>
    );
};
export default Navbar;
