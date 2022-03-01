import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { commerce } from '../lib/commerce';

import CartItem from '../components/CartItem/CartItem';

import './CartPage.css';

// DISCOUNT FORM
// DISCOUNT FORM
// DISCOUNT FORM
const DiscountForm = ({ cart, passResult }) => {
  const [text, setText] = useState('');
  const [checkoutTokenTwo, setCheckoutTokenTwo] = useState(null);
  const [discountResult, setDiscountResult] = useState(null);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: 'cart',
        });

        setCheckoutTokenTwo(token);
      } catch (error) {
        console.log('from cart page ' + error);
      }
    };

    generateToken();
  }, [cart]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    const discount = e.target.value;

    setText(discount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    commerce.checkout
      .checkDiscount(checkoutTokenTwo.id, { code: text })
      .then((res) => {
        setDiscountResult(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    passResult(discountResult);
  }, [discountResult]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={text}
          onChange={handleChange}
          placeholder='Discount Code?'
        />
        <button>Apply</button>
      </form>
    </>
  );
};

// CART PAGE
// CART PAGE
// CART PAGE
const CartPage = ({
  cart,
  onEmptyCart,
  onRemoveFromCart,
  onUpdateCartQty,
  passDiscountCode,
}) => {
  const [discountResults, setDiscountResults] = useState(null);

  const EmptyCart = () => (
    <div className='CartPage-empty'>
      <br />
      <SentimentVeryDissatisfiedOutlinedIcon fontSize='large' />
      <Link to='/products'>go shopping</Link>
    </div>
  );

  const passResult = (e) => {
    e && setDiscountResults(e);
  };

  const handleCheckoutClick = (e) => {
    discountResults &&
      discountResults.valid === true &&
      passDiscountCode(discountResults.code);
  };

  const Msg = () => (
    <div
      className='CartPage-toast'
      style={{
        border: '2px solid green',
        boxShadow: '0 0 20px rgba(0,255,0,0.5)',
      }}
    >
      Emptied Cart
    </div>
  );

  const FilledCart = () => (
    <div className='CartPage-container'>
      <ToastContainer autoClose={false} theme='dark' />
      <div className='CartPage-container-left'>
        {cart.line_items.map((item) => (
          <div key={item.id}>
            <CartItem
              item={item}
              onRemoveFromCart={onRemoveFromCart}
              onUpdateCartQty={onUpdateCartQty}
            />
          </div>
        ))}
      </div>
      <div className='CartPage-container-right'>
        <div className='CartPage-info'>
          <div className='CartPage-info-top'>
            <p>Cart totals</p>
          </div>
          <div className='CartPage-info-middle'>
            <p
              style={{
                textDecoration:
                  discountResults && discountResults.valid === true
                    ? 'line-through'
                    : 'none',
                opacity:
                  discountResults && discountResults.valid === true ? 0.5 : 1,
                color:
                  discountResults && discountResults.valid === true
                    ? 'red'
                    : 'green',
              }}
            >
              Subtotal: {cart.subtotal.formatted_with_symbol}
            </p>
            {/*  */}
            {discountResults && discountResults.valid === true ? (
              <p style={{ marginTop: '1rem' }}>
                New total: {discountResults.live.total.formatted_with_symbol}
              </p>
            ) : discountResults && discountResults.valid === false ? (
              <p>code not valid</p>
            ) : null}
            {/*  */}
            <p className='CartPage-note'>
              Shipping and taxes are included for all U.S. orders.
            </p>
            <p className='CartPage-note'>
              Shipping charges to Canada and Mexico will be added during
              checkout.
            </p>
          </div>
          <div className='CartPage-info-bottom'>
            <Link to='/checkout'>
              <button className='CartPage-btn' onClick={handleCheckoutClick}>
                CHECKOUT
              </button>
            </Link>
            <div className='CartPage-bottom-container'>
              <div
                className='CartPage-btn-remove'
                onClick={() => {
                  toast(<Msg />, {
                    onOpen: onEmptyCart,
                  });
                }}
              >
                empty cart
              </div>
              <div className='CartPage-discount-container'>
                <DiscountForm cart={cart} passResult={passResult} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (!cart.line_items) {
    return 'Loading...';
  }

  return (
    <div className='CartPage'>
      <h1>Cart</h1>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </div>
  );
};

export default CartPage;
