import './Product.css';

const Product = ({ product }) => {
  return (
    <div className='Product'>
      <div image={product.image} title={product.name} />
      <div>
        <div>
          <h5>{product.name}</h5>
          <h5>{product.price}</h5>
        </div>
        <p>{product.description}</p>
      </div>
      <div>
        <button aria-label='Add to Cart'>Add to cart</button>
      </div>
    </div>
  );
};

export default Product;
