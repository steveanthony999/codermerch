import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import { commerce } from './lib/commerce';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home';
import AllProductsPage from './pages/AllProductsPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  const [inDevelopment, setInDevelopment] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [userDataFromStorage, setUserDataFromStorage] = useState();

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  // FETCH CART
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // ADD TO CART
  const handleAddToCart = async (productId, quantity, variantId) => {
    const item = await commerce.cart.add(productId, quantity, variantId);

    setCart(item.cart);
  };

  // UPDATE CART QTY
  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });

    setCart(response.cart);
  };

  // REMOVE ITEM FROM CART
  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId);

    setCart(response.cart);
  };

  // EMPTY CART
  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty();

    setCart(response.cart);
  };

  // REFRESH CART
  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  // CAPTURE CHECKOUT
  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  // USER LOCAL STORAGE
  useEffect(() => {
    if (localStorage.getItem('user')) {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUserDataFromStorage(userData);
    } else {
      localStorage.setItem(
        'user',
        JSON.stringify({
          firstName: '',
          lastName: '',
          email: '',
          streetAddress: '',
          city: '',
          zip: '',
        })
      );

      const userData = JSON.parse(localStorage.getItem('user'));
      setUserDataFromStorage(userData);
    }
  }, []);

  return (
    <div className='App'>
      {inDevelopment ? null : <Navbar cart={cart.total_items} />}
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/products'>
          <AllProductsPage products={products} />
        </Route>
        <Route exact path='/products/:id'>
          <ProductPage onAddToCart={handleAddToCart} />
        </Route>
        <Route exact path='/cart'>
          <CartPage
            cart={cart}
            onEmptyCart={handleEmptyCart}
            onRemoveFromCart={handleRemoveFromCart}
            onUpdateCartQty={handleUpdateCartQty}
          />
        </Route>
        <Route exact path='/checkout'>
          <CheckoutPage
            cart={cart}
            order={order}
            onCaptureCheckout={handleCaptureCheckout}
            error={errorMessage}
            userDataFromStorage={userDataFromStorage}
          />
        </Route>
      </Switch>
      {inDevelopment ? null : <Footer />}
    </div>
  );
}

export default App;
