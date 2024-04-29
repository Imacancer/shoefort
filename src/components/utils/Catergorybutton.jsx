import React from "react";
import { useDispatch } from "react-redux";
import { setAddItemToCart, setOpenCart } from "../../app/CartSlice";

const Item = ({
  id,
  color,
  shadow,
  title,
  text,
  img,
  price,
}) => {
  //   console.log(id)
  const dispatch = useDispatch();

  const onAddToCart = () => {
    const item = { id, title, text, img, color, shadow, price };

    dispatch(setAddItemToCart(item));
  };

  const onCartToggle = () => {
    dispatch(setOpenCart({
        cartState: true
    }))
}

return (
    <>
     <div className={`relative ${shadow} grid items-center justify-items-center rounded-xl py-80 px-5 transition-all duration-700 ease-in-out w-full hover:scale-105`} style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div>
          <h1 className="text-center text-white text-4xl lg:text-lg md:text-base font-medium filter drop-shadow-lg">
            {title}
          </h1>
        </div>
      </div>
    </>
  );
  
};

export default Item;
