import Product from './Product';

import './Products.css';

const Products = ({ products }) => {
  return (
    <main className='Products'>
      <div className='Products-container'>
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </main>
  );
};

export default Products;
