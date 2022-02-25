import Products from '../components/Products/Products';

import './AllProductsPage.css';

const AllProductsPage = ({ products }) => {
  return (
    <div className='AllProductsPage'>
      <div className='AllProductsPage-container'>
        <div className='AllProductsPage-container-head'>
          <h1>All Products</h1>
        </div>
        <div className='AllProductsPage-container-body'>
          <Products products={products} />
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
