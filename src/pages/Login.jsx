import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import COVER_IMAGE from '../assets/shoe.jpg';
import GOOGLE_ICON from '../assets/google.png';

const login = () => {
    const navigate = useNavigate(); // Get the navigate function

    // Function to handle navigation to another route after successful login
    const handleLoginSuccess = () => {
        // Navigate to the desired route (e.g., home page) after successful login
        navigate('/'); // You can change '/' to the route you want to navigate to
    };

  return (
    <div className="w-full h-screen flex items-start">
      <div className='relative w-1/2 h-full flex flex-col'>
        <div className='absolute top-[20%] left-[10%] flex flex-col'>
          <h1 className='text-4xl text-white font-bold my-4'>Where every shoe tells a story</h1>
          <p className='text-xl text-white font-normal'>Register now and get a 50% off shoe discount</p>
        </div>
        <img src={COVER_IMAGE} className="w-full h-full object-cover"/>
      </div>

      <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center'>
        <h1 className='w-full max-w-[550px] mx-auto text-xl text-[#ea580c] font-semibold mr-auto'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
</svg>
ShoeFort.</h1>


      <div className='w-full flex flex-col max-w-[550px]'>
        <div className='w-full flex flex-col mb-2'>
          <h3 className='text-3xl text-[#ea580c] font-semibold mb-2'>Login</h3>
          <p className='text-base text-[#ea580c]  mb-2'>Welcome Back! Please enter your details.</p>
        </div>

        <div className='w-full flex flex-col'>
  <input 
    type="email"
    placeholder="Email"
    className='w-full text-black py-2 my-2 bg-transparent border-b border-[#ea580c] outline-none focus:outline-none hover:border-black transition duration-300' />

  <input
    type="password"
    placeholder="Password"
    className='w-full text-black py-2 my-2 bg-transparent border-b border-[#ea580c] outline-none focus:outline-none hover:border-black transition duration-300' />
</div>


        <div className='w-full flex items-center justify-between'>
          <div className='w-full flex items-center'>
            <input type="checkbox" className="w-4 h-4 mr-2" />
            <p className='text-sm text-[#ea580c]'>Remember me</p>
          </div>

          <p className='text-sm font-medium text-[#ea580c] whitespace-nowrap cursor-pointer underline underline-offset-2 hover:text-black transition duration-300'>Forgot Password?</p>
          </div>

        <div className='w-full flex flex-col my-4'>
        <button className='w-full text-white my-2 font-semibold bg-[#ea580c] rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:bg-black transition duration-300'onClick={handleLoginSuccess}>
                    Log in
                </button>
           <button className='w-full text-[#ea580c] my-2 font-semibold bg-white border-2 border-[#ea580c] rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:border-black hover:text-black transition duration-300'>
           Register
           </button>
           </div>

       <div className='w-full flex items-center justify-center relative py-2'>
        <div className='w-full h-[1px] bg-black'></div>
        <p className='text-lg absolute text-black/80 bg-[#f5f5f5]'>or</p>
       </div>

       <div className='w-full text-[#060606] my-2 font-semibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer hover:border-[#FFA500] transition duration-300'>
            <img src={GOOGLE_ICON} className='h-6 mr-2' /> 
            Sign In With Google
            </div>


      </div>

      <div className='w-full flex items-center justify-center'>
         <p className='text-sm font-normal text-[#ea580c]'>
         Don't have an account yet? 
        <span className='font-semibold underline underline-offset-2 cursor-pointer hover:text-black transition duration-300'>Sign up for free</span>
        </p>
        </div>     
      </div>
    </div>
  )
}

export default login