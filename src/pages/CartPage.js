import { Link } from 'react-router-dom';
import SentimentVeryDissatisfiedOutlinedIcon from '@mui/icons-material/SentimentVeryDissatisfiedOutlined';

import CartItem from '../components/CartItem/CartItem';

import './CartPage.css';

const CartPage = ({ cart, onEmptyCart, onRemoveFromCart, onUpdateCartQty }) => {
  const EmptyCart = () => (
    <div className='CartPage-empty'>
      <br />
      <SentimentVeryDissatisfiedOutlinedIcon fontSize='large' />
      <Link to='/products'>go shopping</Link>
    </div>
  );

  const FilledCart = () => (
    <div className='CartPage-container'>
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
            <p>Subtotal: {cart.subtotal.formatted_with_symbol}</p>
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
              <button className='CartPage-btn'>CHECKOUT</button>
            </Link>
            <div className='CartPage-btn-remove' onClick={onEmptyCart}>
              empty cart
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
