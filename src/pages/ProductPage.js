import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import './ProductPage.css';

const ProductPage = () => {
  //   const [variant, setVariant] = useState([]);
  const [sizeId, setSizeId] = useState();
  const [colorId, setColorId] = useState();
  //   const [isCartButtonActive, setIsCartButtonActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    console.log(location);
  }, []);

  //   const handleChange = (e) => {
  //     setSizeId(e.target.value);
  //     if (e.target.value === null) {
  //       setIsCartButtonActive(false);
  //     } else {
  //       setIsCartButtonActive(true);
  //     }
  //   };

  const handleSizeChange = (e) => {
    setSizeId(e.target.value);
  };

  const handleColorChange = (e) => {
    setColorId(e.target.value);
  };

  //   useEffect(() => {
  //     commerce.products
  //       .getVariants(location.state.id)
  //       .then((x) => setVariant(x.data));
  //   }, [location.state.id]);

  return (
    <div className='ProductPage'>
      <div className='ProductPage-container'>
        <img
          src={location.state.assets[0].url}
          alt='product'
          className='ProductPage-image'
        />
        <h1>{location.state.name}</h1>
        <p>${location.state.price.raw} USD</p>
        {/* <select className='select-full' name='sizes' onChange={handleChange}>
          {isCartButtonActive ? null : (
            <option value={null} id='sizes'>
              --Select Size
            </option>
          )}
          {variant.map((x) => (
            <option
              value={x.id}
              key={x.id}
              id='sizes'
              disabled={x.inventory > 0 ? false : true}
            >
              {x.description}
            </option>
          ))}
        </select> */}
        <select name='sizes' id='' onChange={handleSizeChange}>
          {location.state.variant_groups[0].options.map((x) => (
            <option value={x.id} key={x.id} id='sizes'>
              {x.name}
            </option>
          ))}
        </select>
        <select name='colors' id='' onChange={handleColorChange}>
          {location.state.variant_groups[1].options.map((x) => (
            <option value={x.id} key={x.id} id='colors'>
              {x.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductPage;
