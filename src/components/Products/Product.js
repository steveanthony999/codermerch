import './Product.css';

const Product = ({ product }) => {
  return (
    <div className='Product'>
      <div>
        <img src={product.image} alt={product.name} />
      </div>
      <div>
        <div>
          <h5>{product.name}</h5>
          <h5>{product.price}</h5>
        </div>
        <p>{product.description}</p>
      </div>
    </div>
  );
};

export default Product;
