import React from 'react';
import Categorybutton from './utils/Catergorybutton';
import Title from './utils/Title';

const Categories = ({ ifExists, endpoint: { title, items } }) => {
  return (
    <>
      <div className='nike-container'>
        <div className="flex justify-center mt-32">
          <Title title={title} />
        </div>
        <div className={`grid items-center justify-items-center gap-7 lg:gap-5 mt-7 ${ifExists ? 'grid-cols-3 xl:grid-cols-2 sm:grid-cols-1' : 'grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'}`}>
        </div>
      </div>
    </>
  );
}

export default Categories;
