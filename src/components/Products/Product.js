import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { commerce } from '../../lib/commerce';

import './Product.css';

const Product = ({ product }) => {
  const [variant, setVariant] = useState([]);
  const [totalInventory, setTotalInventory] = useState([]);

  useEffect(() => {
    commerce.products.getVariants(product.id).then((x) => setVariant(x.data));
  }, [product.id]);

  useEffect(() => {
    const totals = variant.reduce((total, item) => {
      return total + item.inventory;
    }, 0);

    setTotalInventory(totals);
  }, [variant, totalInventory]);

  return (
    <Link
      to={{
        pathname: `/products/${product.id}`,
        state: product,
      }}
    >
      <div className='Product'>
        <div className='Product-top'>
          <img
            src={product.assets[0].url}
            alt={product.name}
            className='Product-image'
          />
        </div>
        <div className='Product-bottom'>
          <h5>{product.name}</h5>
          <h5>${product.price.raw}</h5>
        </div>
      </div>
    </Link>
  );
};

export default Product;
