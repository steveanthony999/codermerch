import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import { commerce } from './lib/commerce';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home';
import AllProductsPage from './pages/AllProductsPage';

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div className='App'>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/products'>
          <AllProductsPage products={products} />
        </Route>
        <Route path='/products/:id'>{/* <AllProductsPage /> */}</Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
