import './Product.css';

const Product = ({ product }) => {
  return (
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
  );
};

export default Product;
