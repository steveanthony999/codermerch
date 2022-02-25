import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import { commerce } from './lib/commerce';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home';
import AllProductsPage from './pages/AllProductsPage';
import ProductPage from './pages/ProductPage';

function App() {
  const [inDevelopment, setInDevelopment] = useState(true);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='App'>
      {inDevelopment ? null : <Navbar />}
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/products'>
          <AllProductsPage products={products} />
        </Route>
        <Route exact path='/products/:id'>
          <ProductPage />
        </Route>
      </Switch>
      {inDevelopment ? null : <Footer />}
    </div>
  );
}

export default App;
