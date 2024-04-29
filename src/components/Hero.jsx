import React from 'react';
import Clips from './utils/Clips';
import SocialLink from './utils/SocialLink';

const Hero = ({ heroapi: { Image, title, subtitle, btntext, img, sociallinks, videos } }) => {
  // console.log(heroapi)
  const backgroundImageStyle = {
    backgroundImage: `url(${Image})`,
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
       <header className='bg-theme relative h-auto w-auto flex flex-col' style={backgroundImageStyle}>
        <div className='bg-theme clip-path h-[85vh] lg:h-[75vh] md:h-[65vh] sm:h-[55vh] w-auto absolute top-0 left-0 right-0 opacity-100 z-10'></div>
        <div className='relative opacity-100 z-20 grid items-center justify-items-center nike-container bottom-10 mt-20'>
          <div className='grid items-center justify-items-center mt-28 md:mt-24'>
            <h1 className='text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-white'>{title}</h1>
            <h1 className='text-6xl lg:text-5xl md:text-4xl sm:text-3xl xsm:text-2xl font-extrabold filter drop-shadow-sm text-white'>{subtitle}</h1>
            <button type='button' className='button-theme bg-white shadow-lg rounded-2xl my-5' style={{ transition: 'background-color 0.3s, color 0.3s' }}>{btntext}</button>
            <div className='grid items-center gap-5 md:gap-3 absolute top-[33vh] lg:top-[27vh] left-[11%] xl:left-0 w-auto h-auto'>
              {videos?.map((val, i) => (
                <Clips
                  key={i}
                  imgsrc={val.imgsrc}
                  clip={val.clip}
                />
              ))}
            </div>
            <div className='grid items-center absolute top-[33vh] lg:top-[27vh] right-0 gap-3'>
              {sociallinks?.map((val, i) => (
                <SocialLink
                  key={i}
                  icon={val.icon}
                />
              ))}
            </div>
          </div>
          <div className='flex items-center'>
            <img src={img} alt='hero-img/img' className='w-auto h-[45vh] lg:h-[35vh] md:h-[31vh] sm:h-[21vh] xsm:h-[19vh] transitions-theme -rotate-[25deg] hover:rotate-0 cursor-pointer object-fill'/>
          </div>
        </div>
      </header>
   </>
  )
}

export default Hero