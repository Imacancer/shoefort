import React, { useEffect, useState } from 'react'

const Footer = ({ footerAPI: { titles, links, FooterImage } }) => {
  const [Year, setYear] = useState();
  useEffect(() => {
      const getYear = () => setYear(new Date().getFullYear());
      getYear();
  }, []);

  const backgroundImageStyle = {
    backgroundImage: `url(${FooterImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100%', 
    
    '@media (max-width: 1024px)': {
      height: '77%', // Adjusted height for screens up to 1024px (110% of 70%)
    },
    
    '@media (max-width: 768px)': {
      height: '55%', // Adjusted height for screens up to 768px (110% of 50%)
    },
    
    '@media (max-width: 640px)': {
      height: '44%', // Adjusted height for screens up to 640px (110% of 40%)
    },
    
    '@media (max-width: 480px)': {
      height: '33%', // Adjusted height for screens up to 480px (110% of 30%)
    },
    
    '@media (max-width: 360px)': {
      height: '27%', // Adjusted height for screens up to 360px (110% of 25%)
    },
  };

  return (
   <>
      <footer className='bg-theme2 pt-7 pb-5' style={backgroundImageStyle}>
        <div className='nike-container text-white'>
          <div className='grid items-start grid-cols-3 max-w-2xl w-full m-auto md:max-w-none md:gap-5'>
            {titles.map((val, i) => (
              <div key={i} className="grid items-center">
                <h1 className='text-lg lg:text-base md:text-sm uppercase font-semibold'>{val.title}</h1>
              </div>
            ))}
            {links.map((list, i) => (
              <ul key={i} className="grid items-center gap-1">
                {list.map((link, i) => (
                  <li key={i} className="text-sm sm:text-xs">{link.link}</li>
                ))}
              </ul>
            ))}
          </div>
          <div className='mt-5 text-center'>
            <p className='text-sm md:text-center'>Copyright<sup className='text-base font-bold'>&copy;</sup> All Rights Reserved <span className='font-semibold'>ShoeFort. {Year}</span></p>
          </div>
        </div>
      </footer>
   </>
  )
}

export default Footer