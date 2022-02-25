import { Link } from 'react-router-dom';

import CartItem from '../components/CartItem/CartItem';

import './CartPage.css';

const CartPage = ({ cart, onEmptyCart, onRemoveFromCart, onUpdateCartQty }) => {
  const EmptyCart = () => (
    <div className='empty'>
      :,(
      <br />
      <p>So empty</p>
      <Link
        to='/'
        style={{
          marginTop: '1rem',
          color: 'black',
          textDecoration: 'underline',
        }}
      >
        go shopping
      </Link>
    </div>
  );

  const FilledCart = () => (
    <>
      {cart.line_items.map((item) => (
        <div key={item.id}>
          <CartItem
            item={item}
            onRemoveFromCart={onRemoveFromCart}
            onUpdateCartQty={onUpdateCartQty}
          />
        </div>
      ))}
      <div className='Cart-info'>
        <div className='Cart-info-top'>
          <div className='btn-remove' onClick={onEmptyCart}>
            empty cart
          </div>
          <p>Subtotal: {cart.subtotal.formatted_with_symbol}</p>
        </div>
        <Link to='/checkout'>
          <button className='btn-full'>CHECKOUT</button>
        </Link>
      </div>
    </>
  );

  if (!cart.line_items) {
    return 'Loading...';
  }

  return (
    <div className='CartPage'>
      <div className='Cart-container'>
        {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
      </div>
    </div>
  );
};

export default CartPage;
