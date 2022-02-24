import Product from './Product';

import './Products.css';

const products = [
  {
    id: 1,
    name: 'shirt',
    description: '#shashigang shirt',
    image: 'https://picsum.photos/id/237/200/300',
    price: '$20',
  },
  {
    id: 2,
    name: 'beanie',
    description: '#shashigang beanie',
    image: 'https://picsum.photos/id/237/200/300',
    price: '$20',
  },
];

const Products = () => {
  return (
    <main className='Products'>
      <div className='Products-container'>
        {products.map((product) => (
          <div key={product.id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Products;
