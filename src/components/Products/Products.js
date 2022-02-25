import Product from './Product';

import './Products.css';

// import sampleShirt from '../../assets/sample-shirt.png';
// import sampleShorts from '../../assets/sample-shorts.png';
// import sampleBeanie from '../../assets/sample-beanie.png';

// const products = [
//   {
//     id: 1,
//     name: '#shashigang t-shirt',
//     description: '#shashigang shirt',
//     image: sampleShirt,
//     price: '$20',
//   },
//   {
//     id: 2,
//     name: '#shashigang beanie',
//     description: '#shashigang beanie',
//     image: sampleBeanie,
//     price: '$20',
//   },
//   {
//     id: 3,
//     name: 'No Pineapple Pizza t-shirt',
//     description: 'No Pineapple Pizza shirt',
//     image: sampleShirt,
//     price: '$20',
//   },
//   {
//     id: 4,
//     name: '#shashigang shorts',
//     description: '#shashigang shorts',
//     image: sampleShorts,
//     price: '$20',
//   },
// ];

const Products = ({ products }) => {
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
