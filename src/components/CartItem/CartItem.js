import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './CartItem.css';

const CartItem = ({ item, onRemoveFromCart, onUpdateCartQty }) => {
  const Msg = () => (
    <div
      className='CartItem-toast'
      style={{
        border: '2px solid green',
        boxShadow: '0 0 20px rgba(0,255,0,0.5)',
      }}
    >
      Item removed from cart
    </div>
  );

  const PlusMinusMsg = () => (
    <div
      className='CartItem-toast'
      style={{
        border: '2px solid green',
        boxShadow: '0 0 20px rgba(0,255,0,0.5)',
      }}
    >
      Updated Quantity
    </div>
  );

  return (
    <div className='CartItem'>
      <ToastContainer autoClose={false} theme='dark' />
      <div className='CartItem-left'>
        <img src={item.image.url} alt={item.name} />
        <div
          className='CartItem-btn-remove'
          onClick={() => {
            toast(<Msg />, {
              onOpen: () => onRemoveFromCart(item.id),
            });
          }}
        >
          remove
        </div>
      </div>
      <div className='CartItem-right'>
        <div className='left'>
          <p>{item.name}</p>
          <p className='CartItem-size'>Size {item.variant.description}</p>
        </div>
        <div className='center'>
          <div className='CartItem-buttons'>
            <button
              onClick={() => {
                toast(<PlusMinusMsg />, {
                  onOpen: () => onUpdateCartQty(item.id, item.quantity - 1),
                });
              }}
            >
              -
            </button>
            <p>{item.quantity}</p>
            <button
              onClick={() => {
                toast(<PlusMinusMsg />, {
                  onOpen: () => onUpdateCartQty(item.id, item.quantity + 1),
                });
              }}
            >
              +
            </button>
          </div>
        </div>
        <div className='right'>
          <p className='CartItem-Price'>
            {item.line_total.formatted_with_symbol}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
