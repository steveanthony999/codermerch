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
            <div className='CartPage-btn-remove' onClick={onEmptyCart}>
              empty cart
            </div>
            <p>Subtotal: {cart.subtotal.formatted_with_symbol}</p>
          </div>
          <Link to='/checkout'>
            <button className='CartPage-btn-full'>CHECKOUT</button>
          </Link>
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
      {/* <div className='CartPage-container'> */}
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
      {/* </div> */}
    </div>
  );
};

export default CartPage;
