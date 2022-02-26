import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { commerce } from '../lib/commerce';

import './ProductPage.css';

const ProductPage = ({ onAddToCart }) => {
  const [variant, setVariant] = useState([]);
  const [sizeId, setSizeId] = useState();
  const [isCartButtonActive, setIsCartButtonActive] = useState(false);
  const location = useLocation();

  const handleSizeChange = (e) => {
    setSizeId(e.target.value);
    if (e.target.value === null) {
      setIsCartButtonActive(false);
    } else {
      setIsCartButtonActive(true);
    }
  };

  useEffect(() => {
    commerce.products
      .getVariants(location.state.id)
      .then((x) => setVariant(x.data));
  }, [location.state.id]);

  return (
    <div className='ProductPage'>
      <div className='ProductPage-container'>
        <div className='ProductPage-container-left'>
          <img
            src={location.state.assets[0].url}
            alt='product'
            className='ProductPage-image'
          />
        </div>
        <div className='ProductPage-container-right'>
          <h1>{location.state.name}</h1>
          <select name='sizes' id='' onChange={handleSizeChange}>
            <option value={null} id='sizes'>
              --Select Size
            </option>
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
          </select>
          <div className='ProductPage-sizeguide'>
            <p>SIZE GUIDE</p>
            <hr />
            <img src={location.state.assets[1].url} alt='sizechart' />
          </div>
          <p className='ProductPage-price'>${location.state.price.raw}</p>
          <button
            className={
              isCartButtonActive
                ? 'ProductPage-btn'
                : 'ProductPage-btn-disabled'
            }
            onClick={() => onAddToCart(location.state.id, 1, sizeId)}
            disabled={!isCartButtonActive}
          >
            {isCartButtonActive ? 'ADD TO CART' : 'SELECT A SIZE'}
          </button>
          <p className='ProductPage-info'>
            ALL TAXES AND SHIPPING ARE INCLUDED
          </p>
          <hr />
          <div
            className='ProductPage-description'
            dangerouslySetInnerHTML={{
              __html: location.state.description,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
