import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import { commerce } from './lib/commerce';
import { MobileMenuProvider } from './MobileMenuContext';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import MobileMenu from './components/MobileMenu/MobileMenu';

// import Home from './pages/Home';
import HomePage from './pages/HomePage';
import AllProductsPage from './pages/AllProductsPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

import ScrollToTop from './utils/ScrollToTop';
import './App.css';

function App() {
  // const [inDevelopment, setInDevelopment] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [userDataFromStorage, setUserDataFromStorage] = useState();
  const [discountCode, setDiscountCode] = useState('');

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

  const passDiscountCode = (e) => {
    setDiscountCode(e);
  };

  return (
    <MobileMenuProvider>
      <div className='App'>
        {/* {inDevelopment ? null : <Navbar cart={cart.total_items} />} */}
        <Navbar cart={cart.total_items} />
        <MobileMenu />
        <ScrollToTop />
        <Switch>
          <Route exact path='/'>
            {/* <Home /> */}
            <HomePage />
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
              passDiscountCode={passDiscountCode}
            />
          </Route>
          <Route exact path='/checkout'>
            <CheckoutPage
              cart={cart}
              order={order}
              onCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
              userDataFromStorage={userDataFromStorage}
              discountCode={discountCode}
            />
          </Route>
        </Switch>
        {/* {inDevelopment ? null : <Footer />} */}
        <Footer />
      </div>
    </MobileMenuProvider>
  );
}

export default App;
