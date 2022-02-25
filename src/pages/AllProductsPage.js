import Products from '../components/Products/Products';

import './AllProductsPage.css';

const AllProductsPage = () => {
  return (
    <div className='AllProductsPage'>
      <div className='AllProductsPage-container'>
        <div className='AllProductsPage-container-head'>
          <h1>All Products</h1>
        </div>
        <div className='AllProductsPage-container-body'>
          <Products />
        </div>
      </div>
    </div>
  );
};

export default AllProductsPage;
